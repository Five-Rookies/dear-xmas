'use client'

import React, { useRef } from 'react'
import styles from '@/app/(sign)/_components/sign.module.scss'
import { useRouter } from 'next/navigation'
import { handleSignUp } from '@/utils/apiRequest/signUserSupabase'

const SignUp = () => {
  const router = useRouter()
  const passwordRef = useRef<HTMLInputElement>(null)
  const errorMessages: { [key: string]: string } = {
    userName: '특수문자 제외 8글자 이하만 입력 가능합니다',
    password: '영어,숫자,특수문자 포함 8~15 글자로 입력해주세요',
    passwordHint: '비밀번호 확인이 일치하지 않습니다',
  }

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
                inputElement.setCustomValidity(errorMessages.userName)
            }}
            onInput={e => e.currentTarget.setCustomValidity('')}
          />
        </div>

        <div className={styles.inputField}>
          <h3>이메일</h3>
          <input
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            required
          />
        </div>

        <div className={styles.inputField}>
          <h3>비밀번호</h3>
          <input
            ref={passwordRef}
            name="password"
            type="password"
            placeholder="영어,숫자,특수문자 포함 8~15 글자를 입력해주세요"
            minLength={8}
            maxLength={15}
            pattern="(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#\$%\^*+=\-]).*"
            required
            onInvalid={e => {
              const inputElement = e.currentTarget as HTMLInputElement
              if (inputElement.validity.patternMismatch)
                inputElement.setCustomValidity(errorMessages.password)
            }}
            onInput={e => e.currentTarget.setCustomValidity('')}
          />
          <p>특수문자는 다음 문자들만 입력 가능합니다 : !@#$%^*+=- </p>
        </div>

        <div className={styles.inputField}>
          <h3>비밀번호 확인</h3>
          <input
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            required
            onChange={e =>
              e.currentTarget.setCustomValidity(
                passwordRef.current?.value !== e.currentTarget.value
                  ? errorMessages.passwordHint
                  : '',
              )
            }
          />
        </div>

        <div className={styles.inputField}>
          <h3>비밀번호 찾기 힌트</h3>
          <input
            name="password_hint"
            type="text"
            placeholder="크리스마스에 받았던 가장 좋은 선물은 무엇이었나요?"
            required
          />
        </div>

        <button type="submit">회원가입</button>
      </form>
    </main>
  )
}

export default SignUp
