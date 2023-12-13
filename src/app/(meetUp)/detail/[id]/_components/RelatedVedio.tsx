'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { IYoutubeItem, IYoutubeResponse } from '@/type/YoutubeApiResponse'
import formatRelativeDate from '@/utils/relativeDate'
import ScrollBtn from '@/app/(common)/_components/ScrollBtn'
import useYoutubeDataRequest from '@/hooks/useYoutubeApiRequest'
import Image from 'next/image'
import styles from '../detail.module.scss'
import CreateMeetUpButton from './CreateMeetUpButton'

const RelatedVedio = ({
  currentVideoId,
  channelId,
}: {
  currentVideoId: string
  channelId: string | undefined
}) => {
  const [pageToken, setPageToken] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [videoData, setVideoData] = useState<IYoutubeItem[]>([])
  const currentChannelDataList: IYoutubeResponse | null = useYoutubeDataRequest(
    'detail',
    `&channel_id=${channelId}`,
    25,
    pageToken,
  )
  const scrolledItems: number = 1
  const [displayCount, setDisplayCount] = useState<number>(scrolledItems)

  const fetchMoreVideos = useCallback(async (): Promise<void> => {
    if (isLoading) return

    try {
      setIsLoading(true)
      const nextPageVideos: IYoutubeItem[] = currentChannelDataList!.items
      if (nextPageVideos.length > 0) {
        setVideoData(prevVideos => [...prevVideos, ...nextPageVideos])
        setPageToken(currentChannelDataList!.nextPageToken)
      }
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, currentChannelDataList])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY: number =
        window.scrollY || document.documentElement.scrollTop

      const windowHeight: number =
        window.innerHeight || document.documentElement.clientHeight

      const { scrollHeight } = document.documentElement
      const isNearBottom: boolean = scrollY + windowHeight >= scrollHeight - 200

      if (isNearBottom && !isLoading && currentChannelDataList) {
        setDisplayCount(prevDisplayCount => prevDisplayCount + scrolledItems)
        fetchMoreVideos()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isLoading, currentChannelDataList, fetchMoreVideos])

  return (
    <section>
      <CreateMeetUpButton currentVideoId={currentVideoId} />
      <ul className={styles.list}>
        {videoData &&
          videoData
            .slice(0, displayCount)
            .map((video: IYoutubeItem, index: number) => {
              const VIDEO_SNIPPET = video.snippet
              return (
                <li key={video.id.videoId + index} className={styles.listItem}>
                  <Link
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    className={styles.listLink}
                  >
                    <figure className={styles.listImg}>
                      <Image
                        src={VIDEO_SNIPPET.thumbnails.medium.url}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        layout="responsive"
                        alt={VIDEO_SNIPPET.title}
                      />
                    </figure>
                    <div className={styles.listTitleWrap}>
                      <h4 className={styles.listTitle}>
                        {VIDEO_SNIPPET.title}
                      </h4>
                      <p className={styles.channelTitle}>
                        {VIDEO_SNIPPET.channelTitle}
                      </p>
                      <span className={styles.publishedAt}>
                        {formatRelativeDate(VIDEO_SNIPPET.publishedAt)}
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
      </ul>
      <ScrollBtn />
    </section>
  )
}

export default RelatedVedio
