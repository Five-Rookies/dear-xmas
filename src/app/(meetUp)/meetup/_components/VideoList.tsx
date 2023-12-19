'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import formatRelativeDate from '@/utils/relativeDate'
import { IYoutubeResponse, IYoutubeItem } from '@/type/YoutubeApiResponse'
import youtubeDataRequest from '@/utils/youtubRequest/youtubeApiRequest'
import useScrollBottom from '@/hooks/useScrollBottom'
import ScrollBtn from '@/app/(common)/_components/ScrollBtn'
import styles from '../meetup.module.scss'

interface IProps {
  initialData: IYoutubeItem[] | []
  pageToken: string
}

const VideoList = ({ initialData, pageToken }: IProps): React.JSX.Element => {
  const [videoList, setVideoList] = useState<IYoutubeItem[] | []>(initialData)
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  const isBottom: boolean = useScrollBottom(100)

  const fetchMoreData = useCallback(async () => {
    // setIsLoading(true)
    const { items } = await youtubeDataRequest({ pageToken })
    setVideoList(prevVideoList => {
      return [...prevVideoList, ...items.slice(0, 8)]
    })
    // setIsLoading(false)
  }, [])

  useEffect(() => {
    if (isBottom) {
      fetchMoreData()
    }
  }, [isBottom])

  return (
    <div className={styles.videoContainer}>
      <ul className={styles.videoList}>
        {videoList.map((video: IYoutubeItem, index: number) => {
          const VIDEO = video.snippet
          return (
            <li className={styles.videoCard} key={video.id.videoId + index}>
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
      {/* {isLoading && <p>Loading...</p>} */}
      <ScrollBtn />
    </div>
  )
}

export default VideoList
