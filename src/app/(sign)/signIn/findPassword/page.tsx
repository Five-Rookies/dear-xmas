'use client'

import React, { useRef } from 'react'
import styles from '@/app/(sign)/_components/sign.module.scss'
import Link from 'next/link'
import { supabase, executeQuery } from '@/utils/apiRequest/defaultApiSetting'

interface IProfile {
  email: string
  id: string
  password_hint: string
  profile_img: 0 | 1 | 2 | 3
  user_name: string
}

const FindPasswordPage = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordHintRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const email = emailRef.current?.value
    const passwordHint = passwordHintRef.current?.value

    const userdata: IProfile[] = await executeQuery(
      supabase.from('profiles').select('*').eq('email', email),
      '유저정보를 불러오지 못했습니다',
    )
    if (!userdata.length) {
      alert('유효하지 않은 이메일 입니다!')
      return null
    }

    const profilePasswordHint = userdata[0].password_hint
    if (passwordHint !== profilePasswordHint) {
      alert('비밀번호 힌트가 일치하지 않습니다!')
      return null
    }
  }

  return (
    <main className={styles.container}>
      <h1>비밀번호 찾기</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.inputField}>
          <h3>이메일</h3>
          <input
            ref={emailRef}
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요"
          />
        </div>

        <div className={styles.inputField}>
          <h3>비밀번호 찾기 힌트</h3>
          <input
            ref={passwordHintRef}
            name="password_hint"
            type="text"
            placeholder="크리스마스에 받았던 가장 좋은 선물은 무엇이었나요?"
          />
        </div>

        <button type="submit">완료</button>
      </form>

      <div className={styles.routerBox}>
        <Link href="/signIn">
          <span className={styles.signInRouter}>로그인으로 돌아가기</span>
        </Link>
      </div>
    </main>
  )
}

export default FindPasswordPage
