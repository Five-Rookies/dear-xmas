'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/app/page.module.scss'
import Link from 'next/link'
import { IYoutubeItem } from '@/type/YoutubeApiResponse'
import useYoutubeDataRequest from '@/hooks/useYoutubeApiRequest'
import formatRelativeDate from '@/utils/relativeDate'
import useLoadMore from '@/hooks/useLoadMore'

type VideoListType = IYoutubeItem[]

const MainMeetupList = () => {
  const [pageToken, setPageToken] = useState<string | undefined>(undefined)
  const popularVideoDataList = useYoutubeDataRequest(
    'popular',
    '&q=크리스마스|크리스마스영화',
    32,
    pageToken,
  )
  const [videoData, setVideoData] = useState<VideoListType>([])

  const { loadedCount, loadMore } = useLoadMore(8, 4)

  useEffect(() => {
    if (popularVideoDataList) {
      setVideoData(popularVideoDataList.items)
    }
  }, [popularVideoDataList])

  return (
    <div>
      <ul className={styles.meetupList}>
        {videoData
          .slice(0, loadedCount)
          .map((video: IYoutubeItem, index: number) => {
            const VIDEO_SNIPPET = video.snippet
            return (
              <li key={video.id.videoId + index}>
                <Link
                  href={{
                    pathname: `/detail/${video.id.videoId}`,
                  }}
                >
                  <div className={styles.imgFrame}>
                    <img
                      src={VIDEO_SNIPPET.thumbnails.medium.url}
                      alt={VIDEO_SNIPPET.title}
                    />
                    <span className={styles.tag}>NOW</span>
                  </div>
                  <div className={styles.titleArea}>
                    <div>
                      <span className={styles.date}>
                        {formatRelativeDate(VIDEO_SNIPPET.publishedAt)}
                      </span>
                      <h4>{VIDEO_SNIPPET.title}</h4>
                    </div>
                    <div className={styles.channelName}>
                      <span>{VIDEO_SNIPPET.channelTitle}</span>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
      </ul>
      {loadedCount < videoData.length && (
        <button className="btn btn--white" onClick={loadMore}>
          + 더보기
        </button>
      )}
    </div>
  )
}

export default MainMeetupList
