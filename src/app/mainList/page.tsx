import Link from 'next/link'
import styles from '@/app/mainList/page.module.scss'
import React from 'react'
import VIDEO_LIST from '@public/videos/popular.json'
import formatRelativeDate from '@/utils/relativeDate'
import axios from 'axios'

interface Thumbnails {
  default: {
    url: string
    width: number
    height: number
  }
  medium: {
    url: string
    width: number
    height: number
  }
  high: {
    url: string
    width: number
    height: number
  }
  standard: {
    url: string
    width: number
    height: number
  }
  maxres: {
    url: string
    width: number
    height: number
  }
}

interface Snippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: Thumbnails
  channelTitle: string
  tags?: string[]
  categoryId: string
  liveBroadcastContent: string
  defaultLanguage?: string
  localized: {
    title: string
    description: string
  }
  defaultAudioLanguage?: string
}

interface Video {
  kind: string
  etag: string
  id: string
  snippet: Snippet
}

type VideoList = Video[]

const VideoListPage = async () => {
  //const ACCESS_KEY = process.env.YOUTUBE_API_KEY
  //const URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${ACCESS_KEY}`
  //const response = await (await axios.get(URL)).data
  //const videoList: VideoList = response.items
  const videoList: VideoList = VIDEO_LIST.items
  console.log(videoList)
  return (
    <div>
      <ul className={styles.videoList}>
        {videoList.map((video: Video) => {
          const VIDEO = video.snippet
          return (
            <li className={styles.videoCard}>
              <Link className={styles.videoLink} href="">
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
              <Link className={styles.videoLink} href="">
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
    </div>
  )
}

export default VideoListPage
