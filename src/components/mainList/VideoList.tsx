'use client'

import React from 'react'
import styles from '@/app/mainList/page.module.scss'
import formatRelativeDate from '@/utils/relativeDate'
import Link from 'next/link'
import { IVideo } from '@/type/Api'

type VideoListType = IVideo[]

const VideoList = ({ videoList }: { videoList: VideoListType }) => {
  return (
    <>
      <ul className={styles.videoList}>
        {videoList.map((video: IVideo) => {
          const VIDEO = video.snippet
          return (
            <li className={styles.videoCard} key={video.id}>
              <Link
                className={styles.videoLink}
                href={`https://www.youtube.com/watch?v=${video.id}`}
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
    </>
  )
}

export default VideoList
