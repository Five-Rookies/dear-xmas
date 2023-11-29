'use client'

import React, { useEffect, useState, useCallback } from 'react'
import styles from '@/app/page.module.scss'
import formatRelativeDate from '@/utils/relativeDate'
import Link from 'next/link'
import { IYoutubeItem } from '@/type/Api'
import ScrollBtn from '@/components/ScrollBtn'
import useYoutubeDataRequest from '@/hooks/useYoutubeApiRequest'

type VideoListType = IYoutubeItem[]

const VideoList: React.FC = () => {
  // const videoList: VideoListType = await getVideoList()
  // const videoCardRef = useRef<HTMLLIElement | null>(null)
  const [pageToken, setPageToken] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [allVideos, setAllVideos] = useState<VideoListType>([])
  const popularVideoDataList = useYoutubeDataRequest(
    'popular',
    '&q=크리스마스|크리스마스영화',
    4,
  )

  const fetchMoreVideos = useCallback(async () => {
    if (isLoading) return

    try {
      setIsLoading(true)
      const nextPageVideos = popularVideoDataList!.items
      if (nextPageVideos.length > 0) {
        setAllVideos(prevVideos => [...prevVideos, ...nextPageVideos])
        setPageToken(popularVideoDataList!.nextPageToken)
      }
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, pageToken, allVideos, popularVideoDataList])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight
      const { scrollHeight } = document.documentElement
      const isNearBottom = scrollY + windowHeight >= scrollHeight - 200

      if (isNearBottom && !isLoading && popularVideoDataList) {
        fetchMoreVideos()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isLoading, fetchMoreVideos, allVideos])

  return (
    <>
      <ul className={styles.videoList}>
        {allVideos &&
          allVideos.map((video: IYoutubeItem, index: number) => {
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
                    <img
                      className={styles.videoImage}
                      src={VIDEO.thumbnails.medium.url}
                      width={300}
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
    </>
  )
}

export default VideoList
