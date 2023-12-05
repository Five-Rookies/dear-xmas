'use client'

import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import styles from './ScrollBtn.module.scss'

const ScrollBtn = (): React.JSX.Element => {
  const [isAtMiddle, setIsAtMiddle] = useState(false)

  const handleScroll = () => {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop

    // 스크롤이 중간지점에 있을 때
    const atMiddle = currentScrollTop >= window.innerHeight / 2
    setIsAtMiddle(atMiddle)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = (): void => {
    // 다음 위치로 스크롤
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return isAtMiddle ? (
    <button
      className={`scrollBtn ${styles.scrollBtn}`}
      onClick={() => scrollToTop()}
    >
      <FontAwesomeIcon className={styles.arrowUpIcon} icon={faArrowUp} />
    </button>
  ) : (
    null!
  )
}

export default ScrollBtn
