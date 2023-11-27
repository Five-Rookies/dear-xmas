'use client'

import { useRef } from 'react'
import styles from '@/app/page.module.scss'
import formatRelativeDate from '@/utils/relativeDate'
import Link from 'next/link'
import { IVideo } from '@/type/Api'
import ScrollBtn from '@/components/ScrollBtn'

type VideoListType = IVideo[]

const VideoList = ({ videoList }: { videoList: VideoListType }) => {
  const videoCardRef = useRef<HTMLLIElement | null>(null)

  return (
    <>
      <ul className={styles.videoList}>
        {videoList.map((video: IVideo) => {
          const VIDEO = video.snippet
          return (
            <li
              className={`videoCard ${styles.videoCard}`}
              key={video.id}
              ref={videoCardRef}
            >
              <Link
                className={styles.videoLink}
                href={{
                  pathname: `/detail/${video.id}`,
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
                  pathname: `/detail/${video.id}`,
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
      <ScrollBtn elRef={videoCardRef} />
    </>
  )
}

export default VideoList
