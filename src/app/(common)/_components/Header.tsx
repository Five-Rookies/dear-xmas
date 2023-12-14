'use client'

import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import useStore from '@/status/store'
import styles from './header.module.scss'
import HeaderInput from './HeaderInput'
import MainMenu from './MainMenu'

const Header = (): React.JSX.Element => {
  const { isDark, toggleDarkMode } = useStore()
  const [hydrated, setHydrated] = useState(false)
  const [color, setColor] = useState(false)
  const [isClicked, setIsClicked] = useState<boolean>(false)

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
    setColor(isDark)
  }, [isDark])

  const toggleMainMenu = () => {
    setIsClicked(!isClicked)
  }

  const closeMenu = () => {
    setIsClicked(false)
  }

  const modalRef = useRef<null>(null)
  const onClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    if (modalRef.current === event.target) {
      setIsClicked(false)
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.innerBox}>
        <div className={styles.menuBar}>
          <h1>
            <Link href="/" onClick={closeMenu} style={{ display: 'flex' }}>
              <img src="/assets/header_logo_symbol.svg" alt="logo" />
              <img
                className={styles.logo}
                src={`/assets/header_logo${color ? '_white' : ''}.svg`}
                alt="logo"
              />
            </Link>
          </h1>
          <ul className={styles.navi}>
            <li>
              <button onClick={toggleMainMenu}>크리스마스</button>
            </li>
            <li>
              <Link href="/meetup" onClick={closeMenu}>
                촛불모임
              </Link>
            </li>
            <li>
              <Link href="/developers" onClick={closeMenu}>
                개발자
              </Link>
            </li>
          </ul>
          <HeaderInput />
          <button className={styles.darkModeIcon} onClick={onClickDarkMode}>
            {renderThemeToggle()}
          </button>
          <div className={styles.account}>
            <Link href="signIn">
              <span>로그인</span>
            </Link>
            <p className={styles.line}>|</p>
            <Link href="signUp">
              <span>회원가입</span>
            </Link>
          </div>
          <FontAwesomeIcon className={styles.barIcon} icon={faBars} />
        </div>
      </div>
      {isClicked && (
        <MainMenu
          setIsClicked={setIsClicked}
          closeMenu={closeMenu}
          modalRef={modalRef}
          onClickOutside={onClickOutside}
        />
      )}
    </header>
  )
}
export default Header
