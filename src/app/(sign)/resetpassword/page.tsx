'use client'

import React, { useRef } from 'react'
import styles from '@/app/(sign)/_components/sign.module.scss'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'
import { debounce } from 'lodash'
import { PasswordInput, PasswordCheckInput } from '../_components/SignInput'

const ResetPasswordPage = () => {
  const router = useRouter()
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = debounce(async (): Promise<void> => {
    try {
      await supabase.auth.updateUser({ password: passwordRef.current?.value })
      alert('비밀번호 재설정이 완료되었습니다.')
      router.push('/')
    } catch (error) {
      alert('비밀번호 재설정 시도 중 오류가 발생하였습니다.')
      throw error
    }
  }, 500)

  return (
    <main className={styles.container}>
      <h1>비밀번호 재설정</h1>
      <form>
        <PasswordInput passwordRef={passwordRef} />
        <PasswordCheckInput passwordRef={passwordRef} />
        <button
          onClick={handleSubmit}
          onMouseEnter={() => router.prefetch('/')}
          type="button"
        >
          비밀번호 변경 완료
        </button>
      </form>
    </main>
  )
}

export default ResetPasswordPage
