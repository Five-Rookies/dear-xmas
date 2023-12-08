'use client'

import React, { FormEvent, useState } from 'react'
import styles from '@/app/(sign)/_components/sign.module.scss'
import Link from 'next/link'
import { userSignIn } from '@/utils/apiRequest/signUserSupabase'
import { useRouter } from 'next/navigation'

const SignIn = () => {
  const [userId, setUserId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  const onSubmitUserSignIn = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await userSignIn(userId, password)
      router.push('/')
    } catch (error) {
      alert(
        '로그인 실패\n이메일이나 비밀번호가 잘못되었습니다. 다시 입력해주세요!',
      )
      console.log(error)
    }
  }

  return (
    <main className={styles.container}>
      <h1>로그인</h1>
      <form onSubmit={onSubmitUserSignIn}>
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
            placeholder="비밀번호를 입력해주세요"
            onChange={e => {
              setPassword(e.target.value)
            }}
            required
          />
        </div>
        <button type="submit">로그인</button>
        <div className={styles.account}>
          <span>비밀번호를 잊으셨나요?</span>
          <Link href="signIn/findPassword">비밀번호 찾기</Link>
        </div>
        <div className={styles.account}>
          <span>회원이 아니세요?</span>
          <Link href="signUp">회원가입</Link>
        </div>
      </form>
    </main>
  )
}

export default SignIn
