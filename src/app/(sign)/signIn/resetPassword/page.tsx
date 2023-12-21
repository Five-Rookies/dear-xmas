'use client'

import React, { useRef } from 'react'
import styles from '@/app/(sign)/_components/sign.module.scss'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'

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
        <div className={styles.inputField}>
          <h3>새 비밀번호</h3>
          <input
            ref={passwordRef}
            placeholder="영어,숫자,특수문자 포함 8~15 글자를 입력해주세요"
            minLength={8}
            maxLength={15}
            pattern="(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#\$%\^*+=\-]).*"
            required
            onInvalid={e => {
              const inputElement = e.currentTarget as HTMLInputElement
              if (inputElement.validity.patternMismatch)
                inputElement.setCustomValidity(
                  '영어,숫자,특수문자 포함 8~15 글자로 입력해주세요',
                )
            }}
            onInput={e => e.currentTarget.setCustomValidity('')}
            type="password"
          />
          <p>특수문자는 다음 문자들만 입력 가능합니다 : !@#$%^*+=- </p>
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
