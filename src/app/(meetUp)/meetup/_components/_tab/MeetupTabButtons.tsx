'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from '@/app/(meetUp)/meetup/meetup.module.scss'
import btn from '@/app/globalButton.module.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MeetupTabButtons = (): React.JSX.Element => {
  const pathName = usePathname()
  const firstButtonRef = useRef<HTMLButtonElement | null>(null)

  const handleClickTabButton = (tabName: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeTab', tabName)
    }
  }

  useEffect(() => {
    firstButtonRef.current?.focus()
  }, [])

  return (
    <div className={styles.buttonContainer}>
      <div className={styles.buttonColumn}>
        <Link href="/meetup">
          <button
            className={`${btn.button} ${btn.buttonGray} ${
              pathName === '/meetup' ? btn.activeTab : ''
            }`}
            ref={firstButtonRef}
            onClick={() => handleClickTabButton('meetup')}
          >
            모임생성 가능한 영상
          </button>
        </Link>

        <Link href="/meetup/meetupList">
          <button
            className={`${btn.button} ${btn.buttonGray} ${
              pathName === '/meetup/meetupList' ? btn.activeTab : ''
            }`}
            onClick={() => handleClickTabButton('meetupList')}
          >
            생성된 모임
          </button>
        </Link>
        <Link href="/meetup/myMeetupList">
          <button
            className={`${btn.button} ${btn.buttonGray} ${
              pathName === '/meetup/myMeetupList' ? btn.activeTab : ''
            }`}
            onClick={() => handleClickTabButton('myMeetupList')}
          >
            내 모임
          </button>
        </Link>
      </div>
    </div>
  )
}

export default MeetupTabButtons
