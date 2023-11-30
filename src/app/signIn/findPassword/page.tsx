import React from 'react'
import styles from '@/app/signUp/sign.module.scss'
import Link from 'next/link'

const page = () => {
  return (
    <main className={`${styles.singInContainer} ${styles.container}`}>
      <h1>비밀번호 찾기</h1>
      <form>
        <div className="input-field">
          <h3>비밀번호 찾기 힌트</h3>
          <input
            type="text"
            placeholder="크리스마스에 받았던 가장 좋은 선물은 무엇이었나요?"
          />
        </div>
        <div className="input-field">
          <h3>새 비밀번호</h3>
          <input type="text" placeholder="비밀번호를 입력해주세요" />
        </div>
        <div className="input-field">
          <h3>비밀번호 확인</h3>
          <input type="text" placeholder="비밀번호를 힌번 더 입력해주세요" />
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

export default page
