'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { IYoutubeItem } from '@/type/Api'
import formatRelativeDate from '@/utils/relativeDate'
import ScrollBtn from '@/components/ScrollBtn'
import useYoutubeDataRequest from '@/hooks/useYoutubeApiRequest'
import styles from './detail.module.scss'

const RelatedVedio = ({ channelId }: { channelId: string }) => {
  const [videoData, setVideoData] = useState<IYoutubeItem[]>([])
  const currentChannelDataList = useYoutubeDataRequest(
    'detail',
    `&channel_id=${channelId}`,
    25,
  )

  useEffect(() => {
    if (currentChannelDataList !== null)
      setVideoData(currentChannelDataList.items)
  }, [currentChannelDataList])

  return (
    <section>
      <h3 className={styles.relatedTitle}>관련된 영상</h3>
      <ul className={styles.list}>
        {videoData &&
          videoData.map((item: IYoutubeItem, idx: number) => (
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
