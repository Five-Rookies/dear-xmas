import React, { useEffect, useRef } from 'react'
import styles from '../meetup.module.scss'
import btn from '@/app/globalButton.module.scss'

interface IHandleClickButton {
  activeTab: string
  handleClickTabButton: (tabName: string) => void
}

const MeetupTabButtons = ({
  activeTab,
  handleClickTabButton,
}: IHandleClickButton): React.JSX.Element => {
  const firstButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    firstButtonRef.current?.focus()
  }, [])

  return (
    <div className={styles.buttonContainer}>
      <button
        className={`${btn.button} ${btn.buttonGray} ${
          activeTab === 'videoList' ? btn.activeTab : ''
        }`}
        ref={firstButtonRef}
        onClick={() => handleClickTabButton('videoList')}
      >
        모임생성 가능한 영상
      </button>
      <button
        className={`${btn.button} ${btn.buttonGray} ${
          activeTab === 'meetupList' ? btn.activeTab : ''
        }`}
        onClick={() => handleClickTabButton('meetupList')}
      >
        생성된 모임
      </button>
      <button
        className={`${btn.button} ${btn.buttonGray} ${
          activeTab === 'myMeetupList' ? btn.activeTab : ''
        }`}
        onClick={() => handleClickTabButton('myMeetupList')}
      >
        내 모임
      </button>
    </div>
  )
}

export default MeetupTabButtons
