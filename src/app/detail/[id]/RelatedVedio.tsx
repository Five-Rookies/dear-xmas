'use client'

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { IYoutubeItem } from '@/type/Api';
import formatRelativeDate from '@/utils/relativeDate';
import ScrollBtn from '@/components/ScrollBtn';
import useYoutubeDataRequest from '@/hooks/useYoutubeApiRequest';
import styles from './detail.module.scss';
import Image from 'next/image';

const RelatedVedio = ({ channelId }: { channelId: string }) => {
  const [pageToken, setPageToken] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [videoData, setVideoData] = useState<IYoutubeItem[]>([])
  const currentChannelDataList = useYoutubeDataRequest(
    'detail',
    `&channel_id=${channelId}`,
    25,
    pageToken
  )

  const scrolledItems = 1
  const [displayCount, setDisplayCount] = useState(scrolledItems)

  const fetchMoreVideos = useCallback(async () => {
    if (isLoading) return

    try {
      setIsLoading(true)
      const nextPageVideos = currentChannelDataList!.items
      if (nextPageVideos.length > 0) {
        setVideoData(prevVideos => [...prevVideos, ...nextPageVideos])
        setPageToken(currentChannelDataList!.nextPageToken)
      }
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, currentChannelDataList])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight
      const { scrollHeight } = document.documentElement
      const isNearBottom = scrollY + windowHeight >= scrollHeight - 200

      if (isNearBottom && !isLoading && currentChannelDataList) {
        setDisplayCount((prevDisplayCount) => prevDisplayCount + scrolledItems)
        fetchMoreVideos()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isLoading, currentChannelDataList, fetchMoreVideos])

  // useEffect(() => {
  //   if (currentChannelDataList !== null)
  //     setVideoData(currentChannelDataList.items)
  // }, [currentChannelDataList])

  return (
    <section>
      <h3 className={styles.relatedTitle}>관련된 영상</h3>
      <ul className={styles.list}>
        {videoData && videoData.slice(0, displayCount).map((item: IYoutubeItem, idx: number) => (
          <li key={idx} className={styles.listItem}>
            <Link
              href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
              className={styles.listLink}
            >
              <figure className={styles.listImg}>
                <Image
                  src={item.snippet.thumbnails.medium.url}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                  alt={item.snippet.title}
                />
              </figure>
              <div className={styles.listTitleWrap}>
                <h4 className={styles.listTitle}>{item.snippet.title}</h4>
                <p className={styles.channelTitle}>{item.snippet.channelTitle}</p>
                <span className={styles.publishedAt}>
                  {formatRelativeDate(item.snippet.publishedAt)}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {/* {isLoading && <p>Loading...</p>} */}
      <ScrollBtn />
    </section>
  );
};

export default RelatedVedio;
