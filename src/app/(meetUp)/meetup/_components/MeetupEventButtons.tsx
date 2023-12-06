import React from 'react'
import styles from '../meetup.module.scss'

const MeetupEventButtons = () => {
  return (
    <div className={styles.buttonList}>
      <button className={styles.videoButton}>모임생성 가능한 영상</button>
      <button className={styles.meetupButton}>생성된 모임</button>
    </div>
  )
}

export default MeetupEventButtons
