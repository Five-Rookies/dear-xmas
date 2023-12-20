import React from 'react'
import RelatedVedio from '@/app/(meetUp)/detail/[id]/_components/RelatedVedio'
import CommentList from '@/app/(meetUp)/detail/[id]/_components/CommentList'
import youtubeRequest from '@/utils/youtubRequest/youtubeRequest'
import { IVideoInfoToCookie, getVideoInfoToCookie } from '@/utils/cookieServer'
import styles from './detail.module.scss'
import DetailHeader from './_components/DetailHeader'
import CreateMeetUpButton from './_components/CreateMeetUpButton'

const DetailPage = async ({ params }: { params: { id: string } }) => {
  // 클릭한 영상에 해당하는 채널ID의 영상 목록을 가져오는 함수
  const getChannelVideoList = async (channelId: string) => {
    const { itemList: channelVideoList = [], pageToken = '' } =
      await youtubeRequest({
        apiType: 'detail',
        optionalQuery: {
          channelId,
          maxResults: '6',
        },
      })

    return { channelVideoList, pageToken }
  }

  const currentVideoId = params.id
  const currentVideoInfo: IVideoInfoToCookie | null = getVideoInfoToCookie()
  const { channelVideoList, pageToken } = await getChannelVideoList(
    currentVideoInfo!.channelId,
  )

  return (
    <div className={`inner-box ${styles.detail} ${styles.detailContainer}`}>
      <DetailHeader title={currentVideoInfo?.channelTitle} back="detail" />
      <div className={styles.titleArea}>
        <h1 className={styles.videoInfoTitle}>{currentVideoInfo?.title}</h1>
        <CreateMeetUpButton
          thumbnailUrl={currentVideoInfo?.thumbnailsUrl}
          currentVideoId={currentVideoId}
        />
      </div>
      <div className={styles.visualContainer}>
        <div>
          <figure className={styles.visual}>
            <iframe
              src={`https://www.youtube.com/embed/${currentVideoId}`}
              width="100%"
              height="100%"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </figure>
          <CommentList getVideoId={currentVideoId} />
        </div>
        <RelatedVedio
          initialData={channelVideoList}
          channelId={currentVideoInfo!.channelId}
          pageToken={pageToken}
        />
      </div>
    </div>
  )
}

export default DetailPage
