'use client'

import React from 'react'
import styles from '@/app/(sign)/_components/sign.module.scss'
import Link from 'next/link'

const SignIn = () => {
  return (
    <main className={styles.container}>
      <h1>로그인</h1>
      <form>
        <div className="input-field">
          <h3>아이디</h3>
          <input type="text" placeholder="아이디를 입력해주세요" />
        </div>
        <div className="input-field">
          <h3>비밀번호</h3>
          <input type="text" placeholder="비밀번호를 입력해주세요" />
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
