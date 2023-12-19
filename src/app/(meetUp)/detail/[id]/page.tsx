import React from 'react'
import RelatedVedio from '@/app/(meetUp)/detail/[id]/_components/RelatedVedio'
import CommentList from '@/app/(meetUp)/detail/[id]/_components/CommentList'
import { getVideoInfoToCookie } from '@/utils/youtubRequest/videoInfoCookieServer'
import styles from './detail.module.scss'
import DetailHeader from './_components/DetailHeader'
import CreateMeetUpButton from './_components/CreateMeetUpButton'

interface IVideoInfoToCookie {
  channelTitle: string
  videoId: string
  channelId: string
  title: string
  thumbnailsUrl: string
}

const Detail = () => {
  const currentVideo: IVideoInfoToCookie = getVideoInfoToCookie()

  return (
    <div className={`inner-box ${styles.detail} ${styles.detailContainer}`}>
      <DetailHeader title={currentVideo.channelTitle} back="detail" />
      <div className={styles.titleArea}>
        <h1 className={styles.videoInfoTitle}>{currentVideo.title}</h1>{' '}
        <CreateMeetUpButton
          thumbnailUrl={currentVideo.thumbnailsUrl}
          currentVideoId={currentVideo.videoId}
        />
      </div>
      <div className={styles.visualContainer}>
        <div>
          <figure className={styles.visual}>
            <iframe
              src={`https://www.youtube.com/embed/${currentVideo.videoId}`}
              width="100%"
              height="100%"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </figure>
          <CommentList getVideoId={currentVideo.videoId} />
        </div>
        <RelatedVedio
          currentVideoId={currentVideo.videoId}
          channelId={currentVideo.channelId}
        />
      </div>
    </div>
  )
}

export default Detail
