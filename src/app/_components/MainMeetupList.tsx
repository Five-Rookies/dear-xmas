'use client'

import React, {useEffect, useState} from 'react'
import styles from '@/app/page.module.scss'
import Link from 'next/link'
import { IYoutubeItem } from '@/type/YoutubeApiResponse'
import useYoutubeDataRequest from '@/hooks/useYoutubeApiRequest'
import formatRelativeDate from '@/utils/relativeDate'

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
  const [loadedVideos, setloadedVideos] = useState<number>(8)

  useEffect(() => {
    if (popularVideoDataList) {
      setVideoData(popularVideoDataList.items)
    }
  }, [popularVideoDataList])

  const loadMore = () => {
    // Increase the loadedVideos by 4 each time the "moreBtn" is clicked
    setloadedVideos((prevCount) => prevCount + 4)
  }

  return (
    <div>
      <ul className={styles.meetupList}>
        {videoData.slice(0, loadedVideos).map((video: IYoutubeItem, index: number) => {
          const VIDEO = video.snippet
          return (
            <li key={video.id.videoId + index}>
              <Link href={{ pathname: `/detail/${video.id.videoId}` }}>
                <div className={styles.imgFrame}>
                  <img
                    src={VIDEO.thumbnails.medium.url}
                    alt={VIDEO.title}
                  />
                  <span className={styles.tag}>NOW</span>
                </div>
                <div className={styles.titleArea}>
                  <div>
                    <span className={styles.date}>
                      {formatRelativeDate(VIDEO.publishedAt)}
                    </span>
                    <h4>{VIDEO.title}</h4>
                  </div>
                  <div className={styles.channelName}>
                    <span>{VIDEO.channelTitle}</span>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
      {loadedVideos < videoData.length && (
        <button className='btn btn--white' onClick={loadMore}>
          + 더보기
        </button>
      )}
    </div>
  )
}

export default MainMeetupList
