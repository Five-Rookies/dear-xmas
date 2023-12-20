'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import formatRelativeDate from '@/utils/relativeDate'
import { IYoutubeItem } from '@/type/YoutubeApiResponse'
import ScrollBtn from '@/app/(common)/_components/ScrollBtn'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { setVideoInfoToCookie } from '@/utils/cookieClient'
import styles from '../meetup.module.scss'

interface IProps {
  initialData: IYoutubeItem[] | []
  pageToken: string
}

const VideoList = ({ initialData, pageToken }: IProps): React.JSX.Element => {
  const videoList = useInfiniteScroll({
    pageToken,
    initialData,
  })

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
                onClick={() => {
                  setVideoInfoToCookie({
                    channelTitle: video.snippet.channelTitle,
                    videoId: video.id.videoId,
                    channelId: video.snippet.channelId,
                    title: video.snippet.title,
                    thumbnailsUrl: video.snippet.thumbnails.medium.url,
                  })
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
