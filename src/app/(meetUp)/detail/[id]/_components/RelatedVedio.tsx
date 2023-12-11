'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { IYoutubeItem } from '@/type/YoutubeApiResponse'
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
  channelId: string
}) => {
  const [pageToken, setPageToken] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [videoData, setVideoData] = useState<IYoutubeItem[]>([])
  const currentChannelDataList = useYoutubeDataRequest(
    'detail',
    `&channel_id=${channelId}`,
    25,
    pageToken,
  )
  const scrolledItems = 1
  const [displayCount, setDisplayCount] = useState(scrolledItems)

  const fetchMoreVideos = useCallback(async () => {
    if (isLoading) return

    try {
      setIsLoading(true)
      const nextPageVideos = currentChannelDataList!.items
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
      const scrollY = window.scrollY || document.documentElement.scrollTop
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight
      const { scrollHeight } = document.documentElement
      const isNearBottom = scrollY + windowHeight >= scrollHeight - 200

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
          videoData.slice(0, displayCount).map((item: IYoutubeItem) => {
            const SNIPPET = item.snippet
            return (
              <li key={item.id.videoId} className={styles.listItem}>
                <Link
                  href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                  className={styles.listLink}
                >
                  <figure className={styles.listImg}>
                    <Image
                      src={SNIPPET.thumbnails.medium.url}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: '100%', height: 'auto' }}
                      layout="responsive"
                      alt={SNIPPET.title}
                    />
                  </figure>
                  <div className={styles.listTitleWrap}>
                    <h4 className={styles.listTitle}>{SNIPPET.title}</h4>
                    <p className={styles.channelTitle}>
                      {SNIPPET.channelTitle}
                    </p>
                    <span className={styles.publishedAt}>
                      {formatRelativeDate(SNIPPET.publishedAt)}
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
