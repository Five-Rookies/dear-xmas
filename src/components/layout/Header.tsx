'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styles from './header.module.scss'
import HeaderInput from './HeaderInput'
import useStore from '@/status/store'

const Header = (): React.JSX.Element => {
  const { isDark, toggleDarkMode } = useStore()
  const [hydrated, setHydrated] = useState(false)

  const onClickDarkMode = (): void => {
    toggleDarkMode(!isDark)
  }

  const isdarkMode = () => {
    const DOM_EL: HTMLElement = document.documentElement
    isDark
      ? DOM_EL.setAttribute('data-theme', 'dark')
      : DOM_EL.setAttribute('data-theme', 'light')
  }

  const renderThemeToggle = () => {
    if (hydrated) {
      return (
        <img
          style={{ width: '2rem' }}
          src={`/assets/header_${isDark ? 'moon' : 'sun'}.svg`}
          alt=""
        />
      )
    }
  }

  useEffect(() => {
    setHydrated(true)
    isdarkMode()
  }, [isDark])

  return (
    <header className={styles.header}>
      <div className={styles.innerBox}>
        <h1>
          <Link href="/" style={{ display: 'flex' }}>
            <img src="/assets/header_logo_symbol.svg" alt="logo" />
            <img
              src={`/assets/header_logo${isDark ? '_white' : ''}.svg`}
              alt="logo"
            />
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
        <HeaderInput />
        <button className={styles.darkModeIcon} onClick={onClickDarkMode}>
          {renderThemeToggle()}
        </button>
        <div className={styles.account}>
          <span>로그인</span>
          <p className={styles.line}>|</p>
          <span>회원가입</span>
        </div>
        <FontAwesomeIcon className={styles.barIcon} icon={faBars} />
      </div>
    </header>
  )
}
export default Header
