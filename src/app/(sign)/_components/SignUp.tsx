'use client'

import React, { FormEvent, useState } from 'react'
import styles from '@/app/(sign)/_components/sign.module.scss'
import { userSignUp } from '@/utils/apiRequest/signUserSupabase'
import { useRouter } from 'next/navigation'

const SignUp = () => {
  const router = useRouter()
  const [userName, setUserName] = useState<string>('')
  const [userId, setUserId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [checkPassword, setCheckPassword] = useState<string>('')
  const [passwordHint, setPasswordHint] = useState<string>('')

  const setInvalidMessage = (event: EventTarget, inputType: string) => {
    const target = event as HTMLInputElement
    if (inputType === 'userName') {
      target.reportValidity()
      target.setCustomValidity(
        target.validity.patternMismatch
          ? '특수문자 제외 8글자 이하만 입력 가능합니다'
          : '',
      )
    } else if (inputType === 'password') {
      target.reportValidity()
      target.setCustomValidity(
        target.validity.patternMismatch
          ? '영어,숫자,특수문자 포함 8~15 글자 입력해주세요'
          : '',
      )
    } else if (inputType === 'passwordHint') {
      target.setCustomValidity(
        password !== checkPassword ? '비밀번호 확인이 일치하지 않습니다' : '',
      )
    }
  }

  const onSubmitSignUp = async (event: FormEvent) => {
    event.preventDefault()

    const option = {
      user_name: userName,
      password_hint: passwordHint,
    }

    try {
      await userSignUp(userId, password, option)
      alert('인증 이메일을 확인해주세요!')
      router.push('/signIn')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className={styles.container}>
      <h1>회원가입</h1>
      <form onSubmit={onSubmitSignUp}>
        <div className={styles.inputField}>
          <h3>닉네임</h3>
          <input
            type="text"
            placeholder="특수문자 제외 8글자 이하로 입력해주세요"
            minLength={1}
            maxLength={8}
            pattern="[a-zA-Z가-힣0-9]+"
            onChange={e => {
              setUserName(e.target.value)
            }}
            onInvalid={e => {
              setInvalidMessage(e.target, 'userName')
            }}
            required
          />
        </div>
        <div className={styles.inputField}>
          <h3>이메일</h3>
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            onChange={e => {
              setUserId(e.target.value)
            }}
            required
          />
        </div>
        <div className={styles.inputField}>
          <h3>비밀번호</h3>
          <input
            type="password"
            placeholder="영어,숫자,특수문자 포함 8~15 글자를 입력해주세요"
            minLength={8}
            maxLength={15}
            pattern="(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#\$%\^*+=\-]).*"
            onChange={e => {
              setPassword(e.target.value)
            }}
            onInvalid={e => {
              setInvalidMessage(e.target, 'password')
            }}
            required
          />
          <p>특수문자는 다음 문자들만 입력 가능합니다 : !@#$%^*+=- </p>
        </div>
        <div className={styles.inputField}>
          <h3>비밀번호 확인</h3>
          <input
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            onChange={e => {
              setCheckPassword(e.target.value)
              e.target.setCustomValidity(
                password !== e.target.value
                  ? '비밀번호 확인이 일치하지 않습니다'
                  : '',
              )
            }}
            onInvalid={e => {
              setInvalidMessage(e.target, 'passwordHint')
            }}
            required
          />
        </div>
        <div className={styles.inputField}>
          <h3>비밀번호 찾기 힌트</h3>
          <input
            type="text"
            placeholder="크리스마스에 받았던 가장 좋은 선물은 무엇이었나요?"
            onChange={e => {
              setPasswordHint(e.target.value)
            }}
            required
          />
        </div>

        <button type="submit">회원가입</button>
      </form>
    </main>
  )
}

export default SignUp
