'use client'
import Link from 'next/link'
import styles from '../detail.module.scss'
import useStore from '@/status/store'

const CreateMeetUpButton = ({
  currentVideoId,
  thumbnailUrl,
}: {
  thumbnailUrl: string | undefined
  currentVideoId: string
}): JSX.Element => {
  const { setThumbnailUrl } = useStore()
  return (
    <div className={styles.buttonArea}>
      <Link
        href={`/detail/${currentVideoId}/meetupModal`}
        onClick={() => {
          setThumbnailUrl(thumbnailUrl)
        }}
      >
        <button className={styles.createMeetup}>모임 생성</button>
      </Link>
    </div>
  )
}

export default CreateMeetUpButton
