import Link from 'next/link'
import React from 'react'
import styles from '@/components/header.module.scss'
import Search from './Search'

const Header = (): React.JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={styles.innerBox}>
        <h1>
          <Link href="/">
            <img src="/asset/header_logo.svg" alt="logo" />
          </Link>
        </h1>
        <ul className={styles.navi}>
          <li>
            <Link href="/category">크리스마스</Link>
          </li>
          <li>
            <Link href="/developers">개발자</Link>
          </li>
          <li>
            <Link href="/faq">FAQ</Link>
          </li>
        </ul>
        <Search />
        <p className={styles.account}>
          <span>로그인</span>
          <span className={styles.line}>|</span>
          <span>회원가입</span>
        </p>
      </div>
    </header>
  )
}
export default Header
