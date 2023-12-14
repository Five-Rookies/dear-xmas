'use client'

import React, { useEffect, useState } from 'react'
import {
  IYoutubeResponse,
  IYoutubeItem,
  ISnippet,
} from '@/type/YoutubeApiResponse'
import RelatedVedio from '@/app/(meetUp)/detail/[id]/_components/RelatedVedio'
import CommentList from '@/app/(meetUp)/detail/[id]/_components/CommentList'
import useYoutubeDataRequest from '@/hooks/useYoutubeApiRequest'
import styles from './detail.module.scss'
import DetailHeader from './_components/DetailHeader'
import CreateMeetUpButton from './_components/CreateMeetUpButton'

const Detail = (props: any) => {
  const currentVideoId: string = props.params.id
  const [currentVideo, setCurrentVideo] = useState<IYoutubeItem | null>(null)
  const VIDEO_SNIPPET: ISnippet | undefined = currentVideo?.snippet

  const popularVideoDataList: IYoutubeResponse | null = useYoutubeDataRequest(
    'popular',
    '&q=크리스마스|크리스마스영화',
    32,
    undefined,
  )

  const fetchData = (dataRequest: IYoutubeResponse, id: string) => {
    const currentVideoInfo = dataRequest.items.find(
      (channel: IYoutubeItem) => channel.id.videoId === id,
    )
    if (currentVideoInfo) {
      setCurrentVideo(currentVideoInfo)
    }
  }

  useEffect(() => {
    if (popularVideoDataList) {
      fetchData(popularVideoDataList, currentVideoId)
    }
  }, [popularVideoDataList])

  return (
    <div className={`inner-box ${styles.detail}`}>
      {currentVideo && (
        <>
          <DetailHeader title={VIDEO_SNIPPET?.channelTitle} />
          <CreateMeetUpButton
            thumbnailUrl={VIDEO_SNIPPET?.thumbnails.medium.url}
            currentVideoId={currentVideoId}
          />
          <h1 className={styles.videoInfoTitle}>{VIDEO_SNIPPET?.title}</h1>
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
              currentVideoId={currentVideoId}
              channelId={VIDEO_SNIPPET?.channelId}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Detail
