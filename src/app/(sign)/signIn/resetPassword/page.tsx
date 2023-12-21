'use client'

import React, { useRef } from 'react'
import styles from '@/app/(sign)/_components/sign.module.scss'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'
import { PasswordInput, PasswordCheckInput } from '../../_components/SignInput'

const ResetPasswordPage = () => {
  const router = useRouter()
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await supabase.auth.updateUser({ password: passwordRef.current?.value })
      alert('비밀번호 재설정이 완료되었습니다.')
      router.refresh()
    } catch (error) {
      alert('비밀번호 재설정 시도 중 오류가 발생하였습니다.')
      throw error
    }
  }

  return (
    <main className={styles.container}>
      <h1>비밀번호 재설정</h1>
      <form onSubmit={handleSubmit}>
        <PasswordInput passwordRef={passwordRef} />
        <PasswordCheckInput passwordRef={passwordRef} />
        <button type="submit">비밀번호 변경 완료</button>
      </form>
    </main>
  )
}

export default ResetPasswordPage
