import React from 'react'
import RelatedVedio from '@/app/(meetUp)/detail/[id]/_components/RelatedVedio'
import CommentList from '@/app/(meetUp)/detail/[id]/_components/CommentList'
import { IYoutubeItem } from '@/type/YoutubeApiResponse'
import youtubeRequest from '@/utils/youtubRequest/youtubeRequest'
import styles from './detail.module.scss'
import DetailHeader from './_components/DetailHeader'
import CreateMeetUpButton from './_components/CreateMeetUpButton'

// 클릭한 영상의 상세 정보를 가져오는 함수
const getCurrentVideoInfo = async (currentVideoId: string) => {
  const { itemList: totalVideoList = [] } = await youtubeRequest({
    apiType: 'popular',
  })

  return totalVideoList.find(
    (item: IYoutubeItem) => item.id.videoId === currentVideoId,
  )
}

// 클릭한 영상에 해당하는 채널ID의 영상 목록을 가져오는 함수
const getChannelVideoList = async (videoInfo: IYoutubeItem) => {
  const { itemList: channelVideoList = [], pageToken = '' } =
    await youtubeRequest({
      apiType: 'detail',
      optionalQuery: {
        channelId: videoInfo.snippet.channelId,
        maxResults: '6',
      },
    })

  return { channelVideoList, pageToken }
}

const Detail = async ({ params }: { params: { id: string } }) => {
  const currentVideoId = params.id
  const currentVideoInfo = await getCurrentVideoInfo(currentVideoId)
  const { channelVideoList, pageToken } = await getChannelVideoList(
    currentVideoInfo!,
  )

  return (
    <div className={`inner-box ${styles.detail} ${styles.detailContainer}`}>
      <DetailHeader
        title={currentVideoInfo?.snippet.channelTitle}
        back="detail"
      />
      <div className={styles.titleArea}>
        <h1 className={styles.videoInfoTitle}>
          {currentVideoInfo?.snippet.title}
        </h1>{' '}
        <CreateMeetUpButton
          thumbnailUrl={currentVideoInfo?.snippet.thumbnails.medium.url}
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
          channelId={currentVideoInfo!.snippet.channelId}
          pageToken={pageToken}
        />
      </div>
    </div>
  )
}

export default Detail
