import Link from 'next/link'
import { NextPage } from 'next'
import styles from '@/app/mainList/page.module.scss'
import React from 'react'
import VIDEO_LIST from '@public/videos/popular.json'
import formatRelativeDate from '@/utils/relativeDate'
import axios from 'axios'
import { IVideo, ISnippet } from '@/type/Api'

type VideoList = IVideo[]

const VideoListPage: NextPage<ISnippet> = (): React.JSX.Element => {
  // const ACCESS_KEY = process.env.YOUTUBE_API_KEY
  // const URL = https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${ACCESS_KEY}
  // const response = await (await axios.get(URL)).data
  // const videoList: VideoList = response.items
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
