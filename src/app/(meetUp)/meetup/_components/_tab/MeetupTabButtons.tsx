'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from '@/app/(meetUp)/meetup/meetup.module.scss'
import btn from '@/app/globalButton.module.scss'
import Link from 'next/link'

const MeetupTabButtons = (): React.JSX.Element => {
  const firstButtonRef = useRef<HTMLButtonElement | null>(null)
  const [activeTab, setActiveTab] = useState<string>('videoList')

  const getTabState = (): void => {
    const savedState: string | false | null =
      typeof window !== 'undefined' && localStorage.getItem('activeTab')
    if (savedState) {
      setActiveTab(savedState)
    }
  }

  const handleClickTabButton = (tabName: string): void => {
    setActiveTab(tabName)
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeTab', tabName)
    }
  }

  useEffect(() => {
    getTabState()
    firstButtonRef.current?.focus()
  }, [])

  return (
    <div className={styles.buttonContainer}>
      <Link href="/meetup">
        <button
          className={`${btn.button} ${btn.buttonGray} ${
            activeTab === 'videoList' ? btn.activeTab : ''
          }`}
          ref={firstButtonRef}
          onClick={() => handleClickTabButton('videoList')}
        >
          모임생성 가능한 영상
        </button>
      </Link>

      <Link href="/meetup/meetupList">
        <button
          className={`${btn.button} ${btn.buttonGray} ${
            activeTab === 'meetupList' ? btn.activeTab : ''
          }`}
          onClick={() => handleClickTabButton('meetupList')}
        >
          생성된 모임
        </button>
      </Link>
      <Link href="/meetup/myMeetupList">
        <button
          className={`${btn.button} ${btn.buttonGray} ${
            activeTab === 'myMeetupList' ? btn.activeTab : ''
          }`}
          onClick={() => handleClickTabButton('myMeetupList')}
        >
          내 모임
        </button>
      </Link>
    </div>
  )
}

export default MeetupTabButtons
