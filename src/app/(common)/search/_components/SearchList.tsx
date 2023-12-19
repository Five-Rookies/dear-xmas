'use client'

import React from 'react'
import Link from 'next/link'
import formatRelativeDate from '@/utils/relativeDate'
import styles from '@/app/page.module.scss'
import { IYoutubeItem } from '@/type/YoutubeApiResponse'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

interface IProps {
  initialData: IYoutubeItem[] | []
  keyword: string
  pageToken: string
}

const SearchList = ({
  initialData,
  keyword,
  pageToken,
}: IProps): React.ReactElement => {
  const searchResult = useInfiniteScroll({
    pageToken,
    initialData,
    optionalQuery: {
      q: keyword,
      maxResults: '12',
    },
  })

  return (
    <div className="inner-box">
      <ul className={styles.videoList}>
        {searchResult.map((video: IYoutubeItem, index: number) => {
          return (
            <li className={styles.videoCard} key={index}>
              <Link
                className={styles.videoLink}
                href={{
                  pathname: `/detail/${video.id.videoId}`,
                }}
              >
                <div>
                  <img
                    className={styles.videoImage}
                    src={video.snippet.thumbnails.medium.url}
                    width={300}
                  />
                </div>
                <div className={styles.title}>
                  <h4>{video.snippet.title}</h4>
                </div>
                <div className={styles.channelTitle}>
                  <span>{video.snippet.channelTitle}</span>
                </div>
              </Link>
              <div className={styles.publishedAt}>
                <span>{formatRelativeDate(video.snippet.publishedAt)}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SearchList
