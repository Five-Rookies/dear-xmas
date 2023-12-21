'use client'

import React, { useRef } from 'react'
import styles from '@/app/(sign)/_components/sign.module.scss'
import { useRouter } from 'next/navigation'
import { handleSignUp } from '@/utils/apiRequest/signUserSupabase'
import {
  BasicInput,
  PasswordInput,
  PasswordCheckInput,
  PasswordHintInput,
} from '../_components/SignInput'

const SignUpPage = () => {
  const router = useRouter()
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await handleSignUp(event)
      alert('인증 이메일을 확인해주세요!')
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className={styles.container}>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputField}>
          <h3>닉네임</h3>
          <input
            name="user_name"
            type="text"
            placeholder="특수문자 제외 8글자 이하로 입력해주세요"
            minLength={1}
            maxLength={8}
            pattern="[a-zA-Z가-힣0-9]+"
            required
            onInvalid={e => {
              const inputElement = e.currentTarget as HTMLInputElement
              if (inputElement.validity.patternMismatch)
                inputElement.setCustomValidity(
                  '특수문자 제외 8글자 이하만 입력 가능합니다',
                )
            }}
            onInput={e => e.currentTarget.setCustomValidity('')}
          />
        </div>

        <BasicInput
          title="이메일"
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요."
        />
        <PasswordInput passwordRef={passwordRef} />
        <PasswordCheckInput passwordRef={passwordRef} />
        <PasswordHintInput />

        <button type="submit">회원가입</button>
      </form>
    </main>
  )
}

export default SignUpPage
