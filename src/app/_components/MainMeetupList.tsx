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
    8,
    pageToken,
  )
  const [videoData, setVideoData] = useState<VideoListType>([])

  useEffect(() => {
    if (popularVideoDataList) {
      setVideoData((prevData) => [...prevData, ...popularVideoDataList.items])
    }
  }, [popularVideoDataList])

  // const loadMore = () => {
  //   setPageToken(popularVideoDataList.nextPageToken);
  // }
  // console.log(popularVideoDataList);

  return (
    <div>
      <ul className={styles.meetupList}>
        {videoData.map((video: IYoutubeItem, index: number) => {
          const VIDEO = video.snippet
          return (
            // <li>
            //   <Link href="http://naver.com">
            //     <div className={styles.imgFrame}>
            //       <img
            //         src="http://via.placeholder.com/640x300"
            //         alt=""
            //       />
            //       <span className={styles.tag}>NOW</span>
            //     </div>
            //     <div className={styles.titleArea}>
            //       <div>
            //         <span className={styles.date}>12/06 17:00</span>
            //         <h4>함께 캐롤 들으며 스터디해요</h4>
            //       </div>
            //       <div className={styles.channelName}>
            //         <span>쿠키맨이지롱 · 스터디</span>
            //       </div>
            //     </div>
            //   </Link>
            // </li>
            <li key={video.id.videoId + index}>
              <Link href={{pathname: `/detail/${video.id.videoId}`}}>
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
      <button 
        className='moreBtn'
        // onClick={loadMore} 
        // disabled={!popularVideoDataList.nextPageToken}
        >
          + 더보기
      </button>
    </div>
  )
}

export default MainMeetupList
