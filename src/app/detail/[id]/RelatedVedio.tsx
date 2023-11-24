'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { IChannelVideo } from '@/type/Api'
import formatRelativeDate from '@/utils/relativeDate'
import styles from './detail.module.scss'

const RelatedVedio = ({ channelId }: { channelId: string }) => {
  const [videoData, setVideoData] = useState<IChannelVideo[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const ACCESS_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
      try {
        const response = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=25&q=surfing&key=${ACCESS_KEY}`,
        )
        setVideoData(response.data.items)
      } catch (error) {
        console.error('Failed to fetch video data', error)
      }
    }

    fetchData()
  }, [channelId])

  return (
    <section>
      <h3 className={styles.relatedTitle}>관련된 영상</h3>
      <ul className={styles.list}>
        {videoData.map((item: IChannelVideo, idx: number) => (
          <li key={idx} className={styles.listItem}>
            <Link
              href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
              className={styles.listLink}
            >
              <figure className={styles.listImg}>
                <img
                  src={item.snippet.thumbnails.medium.url}
                  alt={item.snippet.title}
                />
              </figure>
              <div>
                <h4 className={styles.listTitle}>{item.snippet.title}</h4>
                <p className={styles.channelTitle}>
                  {item.snippet.channelTitle}
                </p>
                <span className={styles.publishedAt}>
                  {formatRelativeDate(item.snippet.publishedAt)}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RelatedVedio
