'use client'
import Link from 'next/link'
import styles from '../detail.module.scss'
import useStore from '@/status/store'
import { IVideoDetailInfo } from '@/type/Component'

const CreateMeetUpButton = ({
  channelId,
  title,
  channelTitle,
  currentVideoId,
  thumbnailUrl,
}: IVideoDetailInfo): JSX.Element => {
  const { setVideoDetailInfo } = useStore()

  const videoDetailInfo: IVideoDetailInfo = {
    channelId: channelId,
    title: title,
    channelTitle: channelTitle,
    currentVideoId: currentVideoId,
    thumbnailUrl: thumbnailUrl,
  }

  return (
    <div className={styles.buttonArea}>
      <Link
        href={`/detail/${currentVideoId}/meetupModal`}
        onClick={() => {
          setVideoDetailInfo(videoDetailInfo)
        }}
      >
        <button className={styles.createMeetup}>모임 생성</button>
      </Link>
    </div>
  )
}

export default CreateMeetUpButton
