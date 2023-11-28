'use client'

import React, { useEffect, useState } from 'react'
import { IYoutubeItem } from '@/type/Api'
import RelatedVedio from '@/app/detail/[id]/RelatedVedio'
import youtubeDataRequest from '@/utils/apiRequest/youtubeApiRequest'
import styles from './detail.module.scss'
import DetailHeader from './DetailHeader'
import CommentList from '../../../components/detail/CommentList'

const Detail = (props: any) => {
  const [videoId, setVideoId] = useState<string>('')
  const [videoInfo, setVideoInfo] = useState<IYoutubeItem | null>(null)

  useEffect(() => {
    const getVideoList = async (id: string): Promise<void> => {
      const response = await youtubeDataRequest()
      const getItemInfo = response.items.find(
        (channel: IYoutubeItem) => channel.id.videoId === id,
      )
      setVideoInfo(getItemInfo)
    }

    setVideoId(props.params.id)
    getVideoList(props.params.id)
  }, [props.params.id])

  return (
    <div className={`inner-box ${styles.detail}`}>
      {videoInfo !== null ? (
        <>
          <DetailHeader title={videoInfo.snippet.channelTitle} />
          <h1 className={styles.videoInfoTitle}>{videoInfo.snippet.title}</h1>
          <div className={styles.visualContainer}>
            <div>
              <figure className={styles.visual}>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  width="100%"
                  height="100%"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </figure>

              <CommentList getVideoId={videoId} />
            </div>
            <RelatedVedio channelId={videoInfo?.snippet?.channelId} />
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Detail
