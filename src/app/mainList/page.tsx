import Link from 'next/link'
import { NextPage } from 'next'
import styles from '@/app/mainList/page.module.scss'
import React from 'react'
import VIDEO_LIST from '@public/videos/popular.json'
import formatRelativeDate from '@/utils/relativeDate'
import axios from 'axios'
import { IVideo } from '@/type/Api'

type VideoList = IVideo[]

const VideoListPage = (): React.JSX.Element => {
  const videoList: VideoList = VIDEO_LIST.items
  return (
    <div>
      <ul className={styles.videoList}>
        {videoList.map((video: IVideo, idx: number) => {
          return (
            <li key={idx} className={styles.videoCard}>
              <Link
                className={styles.videoLink}
                href={{
                  pathname: `/detail/${video.snippet.channelId}`,
                  query: { id: video.id },
                }}
              >
                <div>
                  <img
                    className={styles.videoImage}
                    src={video.snippet.thumbnails.medium.url}
                    width={300}
                  />
                </div>
                <div className={styles.title}>
                  <h4>{video.snippet.title}</h4>
                </div>
              </Link>
              <Link className={styles.videoLink} href="">
                <div className={styles.channelTitle}>
                  <span>{video.snippet.channelTitle}</span>
                </div>
              </Link>
              <div className={styles.publishedAt}>
                <span>{formatRelativeDate(video.snippet.publishedAt)}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default VideoListPage
