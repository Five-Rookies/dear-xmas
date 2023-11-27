'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { IChannelVideo } from '@/type/Api'
import formatRelativeDate from '@/utils/relativeDate'
import testJSON from '@public/videos/searchByChannels/search-by-channel-id-UC1x03ziDHPct2xTikLyfMDA.json'
import ScrollBtn from '@/components/ScrollBtn'
import styles from './detail.module.scss'

const RelatedVedio = ({ channelId }: { channelId: string }) => {
  const [videoData, setVideoData] = useState<IChannelVideo[]>([])
  const fetchData = async () => {
    const response = await youtubeApiRequest(
      'search',
      `&channel_id=${channelId}`,
      25,
    )
    setVideoData(response)
  }
  useEffect(() => {
    setVideoData(testJSON.items)
    // fetchData()
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
              <div className={styles.listTitleWrap}>
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
      <ScrollBtn />
    </section>
  )
}

export default RelatedVedio
