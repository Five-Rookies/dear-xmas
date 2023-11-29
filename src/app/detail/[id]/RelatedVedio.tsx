'use client'

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { IYoutubeItem } from '@/type/Api';
import formatRelativeDate from '@/utils/relativeDate';
import ScrollBtn from '@/components/ScrollBtn';
import youtubeDataRequest from '@/utils/apiRequest/youtubeApiRequest';
import styles from './detail.module.scss';
import Image from 'next/image';

const RelatedVedio = ({ channelId }: { channelId: string }) => {
  const [videoData, setVideoData] = useState<IYoutubeItem[]>([]);
  const [pageToken, setPageToken] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoreVideos = useCallback(async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await youtubeDataRequest(
        'detail',
        `&channel_id=${channelId}`,
        25,
        pageToken
      );

      if (response.items.length > 0) {
        setVideoData((prevData) => [...prevData, ...response.items]);
        setPageToken(response.nextPageToken);
      }
    } finally {
      setIsLoading(false);
    }
  }, [channelId, isLoading, pageToken]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const isNearBottom = scrollY + windowHeight >= scrollHeight - 200;

      if (isNearBottom && !isLoading && pageToken) {
        fetchMoreVideos();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, fetchMoreVideos, pageToken]);

  useEffect(() => {
    // Initial data fetch when the component mounts
    if (!pageToken) {
      fetchMoreVideos();
    }
  }, [fetchMoreVideos, pageToken]);

  return (
    <section>
      <h3 className={styles.relatedTitle}>관련된 영상</h3>
      <ul className={styles.list}>
        {videoData.map((item: IYoutubeItem, idx: number) => (
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
                  style={{width: '100%', height: 'auto'}}
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
      {isLoading && <p>Loading...</p>}
      <ScrollBtn />
    </section>
  );
};

export default RelatedVedio;
