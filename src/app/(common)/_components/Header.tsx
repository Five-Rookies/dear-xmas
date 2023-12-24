'use client'

import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'
import useStore from '@/status/store'
import { useRouter, usePathname } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { handleSignOut } from '@/utils/apiRequest/signUserSupabase'
import styles from './header.module.scss'
import SearchInput from './SearchInput'
import MainMenu from './MainMenu'
import Profile from './Profile'

const supabase = createClientComponentClient()

const Header = (): React.JSX.Element => {
  const { isDark, toggleDarkMode } = useStore()
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [hydrated, setHydrated] = useState<boolean>(false)
  const [color, setColor] = useState<boolean>(false)
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [showProfile, setShowProfile] = useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname()

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

  const renderLoginMenu = () => {
    if (hydrated) {
      return isLogin ? (
        <div className={styles.account}>
          <button onClick={() => setShowProfile(!showProfile)}>
            <span>프로필</span>
          </button>
          <p className={styles.line}>|</p>
          <span
            onClick={() => {
              handleSignOut()
              router.refresh()
            }}
          >
            로그아웃
          </span>
        </div>
      ) : (
        <div className={styles.account}>
          <Link href="signIn">
            <span className={pathname === '/signIn' ? styles.active : ''}>
              로그인
            </span>
          </Link>
          <p className={styles.line}>|</p>
          <Link href="signUp">
            <span className={pathname === '/signUp' ? styles.active : ''}>
              회원가입
            </span>
          </Link>
        </div>
      )
    }
  }

  useEffect(() => {
    const setLoginMenu = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) setIsLogin(true)
      else setIsLogin(false)
    }
    setLoginMenu()
    setHydrated(true)
    isdarkMode()
    setColor(isDark)
  }, [isDark, isLogin])

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
              <button onClick={() => setIsClicked(!isClicked)}>
                크리스마스
              </button>
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
          <SearchInput />
          <button className={styles.darkModeIcon} onClick={onClickDarkMode}>
            {renderThemeToggle()}
          </button>
          {renderLoginMenu()}
          <FontAwesomeIcon
            className={styles.barIcon}
            icon={faBars}
            onClick={() => setIsClicked(!isClicked)}
          />
          {isClicked && (
            <MainMenu
              setIsClicked={setIsClicked}
              closeMenu={closeMenu}
              modalRef={modalRef}
            />
          )}
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
      {showProfile && <Profile setShowProfile={setShowProfile} />}
    </header>
  )
}
export default Header
