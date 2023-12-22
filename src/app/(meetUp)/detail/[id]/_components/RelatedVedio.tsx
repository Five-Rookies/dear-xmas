'use client'

import React from 'react'
import Link from 'next/link'
import { IYoutubeItem } from '@/type/YoutubeApiResponse'
import formatRelativeDate from '@/utils/relativeDate'
import ScrollBtn from '@/app/(common)/_components/ScrollBtn'
import Image from 'next/image'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import styles from '../detail.module.scss'

interface IProps {
  initialData: IYoutubeItem[] | []
  channelId: string
  pageToken: string
}

const RelatedVedio = ({ initialData, channelId, pageToken }: IProps) => {
  const channelVideoList = useInfiniteScroll({
    pageToken,
    initialData,
    optionalQuery: {
      channelId,
      maxResults: '6',
    },
  })

  return (
    <section className={styles.relatedVideoContainer}>
      <ul className={styles.list}>
        {channelVideoList &&
          channelVideoList.map((video: IYoutubeItem, index: number) => {
            const VIDEO_SNIPPET = video.snippet
            return (
              <li
                key={video.id.videoId + index.toString()}
                className={styles.listItem}
              >
                <Link
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  className={styles.listLink}
                >
                  <figure className={styles.listImg}>
                    <Image
                      src={VIDEO_SNIPPET.thumbnails.medium.url}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: '100%', height: 'auto' }}
                      priority
                      alt={VIDEO_SNIPPET.title}
                    />
                  </figure>
                  <div className={styles.listTitleWrap}>
                    <h4 className={styles.listTitle}>{VIDEO_SNIPPET.title}</h4>
                    <p className={styles.channelTitle}>
                      {VIDEO_SNIPPET.channelTitle}
                    </p>
                    <span className={styles.publishedAt}>
                      {formatRelativeDate(VIDEO_SNIPPET.publishedAt)}
                    </span>
                  </div>
                </Link>
              </li>
            )
          })}
      </ul>
      <ScrollBtn />
    </section>
  )
}

export default RelatedVedio
