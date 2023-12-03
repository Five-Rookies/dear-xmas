'use client'

import React, { useEffect, useState } from 'react'
import { IYoutubeResponse, IYoutubeItem } from '@/type/YoutubeApiResponse'
import RelatedVedio from '@/app/detail/[id]/RelatedVedio'
import CommentList from '@/components/detail/CommentList'
import useYoutubeDataRequest from '@/hooks/useYoutubeApiRequest'
import styles from './detail.module.scss'
import DetailHeader from './DetailHeader'

const Detail = (props: any) => {
  const currentVideoId = props.params.id
  const popularVideoDataList = useYoutubeDataRequest(
    'popular',
    '&q=크리스마스|크리스마스영화',
    32,
    undefined,
  )
  const [currentVideo, setCurrentVideo] = useState<IYoutubeItem | null>(null)

  useEffect(() => {
    if (popularVideoDataList) {
      const fetchData = (dataRequest: IYoutubeResponse, id: string) => {
        const currentVideoInfo = dataRequest.items.find(
          (channel: IYoutubeItem) => channel.id.videoId === id,
        )
        if (currentVideoInfo) {
          setCurrentVideo(currentVideoInfo)
        }
      }

      fetchData(popularVideoDataList!, currentVideoId)
    }
  }, [popularVideoDataList])

  return (
    <div className={`inner-box ${styles.detail}`}>
      {currentVideo !== null ? (
        <>
          <DetailHeader title={currentVideo.snippet.channelTitle} />
          <h1 className={styles.videoInfoTitle}>
            {currentVideo.snippet.title}
          </h1>
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
            <RelatedVedio channelId={currentVideo?.snippet?.channelId} />
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Detail
