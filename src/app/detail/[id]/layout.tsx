'use client'

import React from 'react'
// import type { Metadata } from 'next'
import { useRouter } from 'next/navigation'
import styles from './detail.module.scss'

// export const metadata: Metadata = {
//   title: '상세페이지',
// }

const Layout = props => {
  const router = useRouter()

  return (
    <main className={styles.detail}>
      <header className={styles.header}>
        <button type="button" onClick={() => router.back()}>
          <img src="/assets/left-arrow.png" alt="뒤로가기 아이콘" />
        </button>
        <h1>나만의 과제 이름</h1>
      </header>
      {props.children}
    </main>
  )
}

export default Layout
