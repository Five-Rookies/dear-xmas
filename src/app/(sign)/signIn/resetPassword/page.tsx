'use client'

import React, { useRef } from 'react'
import styles from '@/app/(sign)/_components/sign.module.scss'
import { useRouter } from 'next/navigation'
import { handleResetPassword } from '@/utils/apiRequest/signUserSupabase'

const ResetPasswordPage = () => {
  const router = useRouter()
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await handleResetPassword(event)
      alert('비밀번호 재설정이 완료되었습니다.')
      router.refresh()
      router.replace('/signIn')
    } catch (error) {
      console.error(error)
    }
  }

  const test = () => {
    alert('성공!')
  }

  return (
    <main className={styles.container}>
      <h1>비밀번호 재설정</h1>

      <form onSubmit={test}>
        <div className={styles.inputField}>
          <h3>새 비밀번호</h3>
          <input
            ref={passwordRef}
            name="new_password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            required
          />
        </div>

        <div className={styles.inputField}>
          <h3>비밀번호 확인</h3>
          <input
            type="password"
            placeholder="비밀번호를 힌번 더 입력해주세요"
            required
            onChange={e =>
              e.currentTarget.setCustomValidity(
                passwordRef.current?.value !== e.currentTarget.value
                  ? '비밀번호 확인이 일치하지 않습니다'
                  : '',
              )
            }
          />
        </div>

        <button type="submit">비밀번호 변경</button>
      </form>
    </main>
  )
}

export default ResetPasswordPage
