'use client'

import React, { useState } from 'react'
import styles from '@/app/(sign)/_components/sign.module.scss'
import { useRouter } from 'next/navigation'

const SignUp = () => {
  const router = useRouter()
  const [password, setPassword] = useState<string>('')
  const [checkPassword, setCheckPassword] = useState<string>('')

  // 인풋 유효성 검사 결과에 따른 메세지 설정
  const setInvalidMessage = (event: EventTarget, inputType: string) => {
    const target = event as HTMLInputElement
    const errorMessages: { [key: string]: string } = {
      userName: '특수문자 제외 8글자 이하만 입력 가능합니다',
      password: '영어,숫자,특수문자 포함 8~15 글자로 입력해주세요',
      passwordHint: '비밀번호 확인이 일치하지 않습니다',
    }

    if (inputType === 'passwordHint') {
      target.setCustomValidity(
        password !== checkPassword ? errorMessages[inputType] : '',
      )
    } else {
      // target.reportValidity()
      target.setCustomValidity(
        target.validity.patternMismatch ? errorMessages[inputType] : '',
      )
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('/auth/sign-up', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
      }

      alert('인증 이메일을 확인해주세요!')
      router.refresh()
    } catch (error) {
      alert('[ERROR] 회원가입 시도 중 오류가 발생하였습니다.')
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
            // onInvalid={(e: React.FormEvent<HTMLInputElement>) => {
            //   e.currentTarget.setCustomValidity(
            //     '특수문자 제외 8글자 이하만 입력 가능합니다',
            //   )
            // }}
            // onInput={e => {
            //   e.currentTarget.setCustomValidity('')
            // }}
            required
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
            name="password"
            type="password"
            placeholder="영어,숫자,특수문자 포함 8~15 글자를 입력해주세요"
            minLength={8}
            maxLength={15}
            pattern="(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#\$%\^*+=\-]).*"
            // onChange={e => {
            //   setPassword(e.target.value)
            // }}
            // onInvalid={e => {
            //   setInvalidMessage(e.target, 'password')
            // }}
            required
          />
          <p>특수문자는 다음 문자들만 입력 가능합니다 : !@#$%^*+=- </p>
        </div>

        <div className={styles.inputField}>
          <h3>비밀번호 확인</h3>
          <input
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            // onChange={e => {
            //   setCheckPassword(e.target.value)
            //   setInvalidMessage(e.target, 'passwordHint')
            // }}
            // onInvalid={e => {
            //   setInvalidMessage(e.target, 'passwordHint')
            // }}
            required
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
