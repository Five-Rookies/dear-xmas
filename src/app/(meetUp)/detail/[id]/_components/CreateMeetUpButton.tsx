'use client'
import styles from '../detail.module.scss'

const CreateMeetUpButton = (): JSX.Element => {
  return (
    <div className={styles.buttonArea}>
      <button className={styles.createMeetup}>모임 생성</button>
    </div>
  )
}

export default CreateMeetUpButton
