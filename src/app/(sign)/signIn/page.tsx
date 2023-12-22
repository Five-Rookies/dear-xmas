'use client'

import React, { useEffect } from 'react'
import styles from '@/app/(sign)/_components/sign.module.scss'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { handleSignIn } from '@/utils/apiRequest/signUserSupabase'
import { BasicInput } from '../_components/SignInput'

const SignInPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  let login = searchParams.get('login')

  useEffect(() => {
    if (login) alert('로그인이 필요한 페이지입니다')
    login = null
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await handleSignIn(event)
      router.refresh()
      router.replace('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className={styles.container}>
      <h1>로그인</h1>

      <form onSubmit={handleSubmit}>
        <BasicInput
          title="이메일"
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요."
        />
        <BasicInput
          title="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <button>로그인</button>
      </form>

      <div className={styles.account}>
        <span>비밀번호를 잊으셨나요?</span>
        <Link href="signIn/findPassword">비밀번호 찾기</Link>
      </div>
      <div className={styles.account}>
        <span>회원이 아니세요?</span>
        <Link href="signUp">회원가입</Link>
      </div>
    </main>
  )
}

export default SignInPage
