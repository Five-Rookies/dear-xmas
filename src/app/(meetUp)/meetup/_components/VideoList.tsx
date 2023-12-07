'use client'

import React, { useEffect, useState, useCallback } from 'react'
import formatRelativeDate from '@/utils/relativeDate'
import Link from 'next/link'
import { IYoutubeItem } from '@/type/YoutubeApiResponse'
import ScrollBtn from '@/app/(common)/_components/ScrollBtn'
import useYoutubeDataRequest from '@/hooks/useYoutubeApiRequest'
import Image from 'next/image'
import styles from '../meetup.module.scss'

type VideoListType = IYoutubeItem[]

const VideoList: React.FC = () => {
  const [pageToken, setPageToken] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [videoData, setVideoData] = useState<VideoListType>([])
  const popularVideoDataList = useYoutubeDataRequest(
    'popular',
    '&q=크리스마스|크리스마스영화',
    32,
    pageToken,
  )
  const scrolledItems = 8
  const [displayCount, setDisplayCount] = useState(scrolledItems)

  useEffect(() => {
    if (popularVideoDataList) {
      setVideoData(popularVideoDataList.items)
    }
  }, [popularVideoDataList])
  // const fetchMoreVideos = useCallback(async () => {
  //   if (isLoading) return

  //   try {
  //     setIsLoading(true)
  //     const nextPageVideos = popularVideoDataList!.items
  //     if (nextPageVideos.length > 0) {
  //       setVideoData(prevVideos => [...prevVideos, ...nextPageVideos])
  //       setPageToken(popularVideoDataList!.nextPageToken)
  //     }
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }, [isLoading, popularVideoDataList])

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollY = window.scrollY || document.documentElement.scrollTop
  //     const windowHeight =
  //       window.innerHeight || document.documentElement.clientHeight
  //     const { scrollHeight } = document.documentElement
  //     const isNearBottom = scrollY + windowHeight >= scrollHeight - 200

  //     if (isNearBottom && !isLoading && popularVideoDataList) {
  //       setDisplayCount(prevDisplayCount => prevDisplayCount + scrolledItems)
  //       fetchMoreVideos()
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll)

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [isLoading, popularVideoDataList, fetchMoreVideos])

  return (
    <div className={styles.videoContainer}>
      <ul className={styles.videoList}>
        {videoData
          .slice(0, displayCount)
          .map((video: IYoutubeItem, index: number) => {
            const VIDEO = video.snippet
            return (
              <li
                className={`videoCard ${styles.videoCard}`}
                key={video.id.videoId + index}
              >
                <Link
                  className={styles.videoLink}
                  href={{
                    pathname: `/detail/${video.id.videoId}`,
                  }}
                >
                  <div>
                    <Image
                      className={styles.videoImage}
                      src={VIDEO.thumbnails.medium.url}
                      width={0}
                      height={0}
                      sizes="18.15rem"
                      style={{ width: '18.15rem', height: 'auto' }}
                      layout="responsive"
                      alt={VIDEO.title}
                    />
                  </div>
                  <div className={styles.title}>
                    <h4>{VIDEO.title}</h4>
                  </div>
                </Link>
                <Link
                  className={styles.videoLink}
                  href={{
                    pathname: `/detail/${video.id.videoId}`,
                  }}
                >
                  <div className={styles.channelTitle}>
                    <span>{VIDEO.channelTitle}</span>
                  </div>
                </Link>
                <div className={styles.publishedAt}>
                  <span>{formatRelativeDate(VIDEO.publishedAt)}</span>
                </div>
              </li>
            )
          })}
      </ul>
      {isLoading && <p>Loading...</p>}
      <ScrollBtn />
    </div>
  )
}

export default VideoList
