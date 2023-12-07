'use client'

import React, { FormEvent, useState } from 'react'
import styles from '@/app/(sign)/_components/sign.module.scss'
import { userSignUp } from '@/utils/apiRequest/signUserSupabase'

const SignUp = () => {
  const [userName, setUserName] = useState<string>('')
  const [userId, setUserId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [checkPassword, setCheckPassword] = useState<string>('')
  const [passwordHint, setPasswordHint] = useState<string>('')

  const onSubmitSignUp = async (event: FormEvent) => {
    event.preventDefault()

    const option = {
      user_name: userName,
      password_hint: passwordHint,
    }

    try {
      await userSignUp(userId, password, option)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className={styles.container}>
      <h1>회원가입</h1>
      <form onSubmit={onSubmitSignUp}>
        <div className="input-field">
          <h3>닉네임</h3>
          <input
            type="text"
            placeholder="특수문자 제외 8글자 이하로 입력해주세요"
            onChange={e => {
              setUserName(e.target.value)
            }}
          />
        </div>
        <div className="input-field">
          <h3>아이디</h3>
          <input
            type="text"
            placeholder="이메일을 입력해주세요"
            onChange={e => {
              setUserId(e.target.value)
            }}
          />
        </div>
        <div className="input-field">
          <h3>비밀번호</h3>
          <input
            type="password"
            placeholder="영어,숫자,특수문자 포함 8~15 글자 입력해주세요"
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div className="input-field">
          <h3>비밀번호 확인</h3>
          <input
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            onChange={e => {
              setCheckPassword(e.target.value)
            }}
          />
        </div>
        <div className="input-field">
          <h3>비밀번호 찾기 힌트</h3>
          <input
            type="text"
            placeholder="크리스마스에 받았던 가장 좋은 선물은 무엇이었나요?"
            onChange={e => {
              setPasswordHint(e.target.value)
            }}
          />
        </div>

        <button type="submit">회원가입</button>
      </form>
    </main>
  )
}

export default SignUp
