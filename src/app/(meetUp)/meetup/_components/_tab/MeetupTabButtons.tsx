'use client'

import React, { useEffect, useRef } from 'react'
import styles from '@/app/(meetUp)/meetup/meetup.module.scss'
import btn from '@/app/globalButton.module.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MeetupTabButtons = (): React.JSX.Element => {
  const pathName = usePathname()
  const firstButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    firstButtonRef.current?.focus()
  }, [])

  return (
    <div className={styles.buttonContainer}>
      <div className={styles.buttonColumn}>
        <Link href="/meetup">
          <button
            className={`${btn.button} ${btn.buttonGray} ${
              pathName && pathName === '/meetup' ? btn.activeTab : ''
            }`}
            ref={firstButtonRef}
          >
            모임생성 가능한 영상
          </button>
        </Link>

        <Link href="/meetup/meetupList">
          <button
            className={`${btn.button} ${btn.buttonGray} ${
              pathName && pathName === '/meetup/meetupList' ? btn.activeTab : ''
            }`}
          >
            생성된 모임
          </button>
        </Link>
        <Link href="/meetup/myMeetupList">
          <button
            className={`${btn.button} ${btn.buttonGray} ${
              pathName && pathName === '/meetup/myMeetupList'
                ? btn.activeTab
                : ''
            }`}
          >
            내 모임
          </button>
        </Link>
      </div>
    </div>
  )
}

export default MeetupTabButtons
