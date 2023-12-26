'use client'

import Link from 'next/link'
import styles from '../detail.module.scss'

const CreateMeetUpButton = ({ currentVideoId }: { currentVideoId: string }) => {
  return (
    <div className={styles.buttonArea}>
      <Link href={`/detail/${currentVideoId}/meetupModal`}>
        <button className={styles.createMeetup}>모임 생성</button>
      </Link>
    </div>
  )
}

export default CreateMeetUpButton
