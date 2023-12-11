import React from 'react'
import styles from '../meetup.module.scss'

const MeetupEventButtons = () => {
  return (
    <div className={styles.buttonList}>
      <button className='btn btn--gray'>모임생성 가능한 영상</button>
      <button className='btn btn--gray'>생성된 모임</button>
      <button className='btn btn--gray'>내 모임</button>
    </div>
  )
}

export default MeetupEventButtons
