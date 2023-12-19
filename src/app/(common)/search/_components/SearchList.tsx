'use client'

import React from 'react'
import Link from 'next/link'
import formatRelativeDate from '@/utils/relativeDate'
import styles from '@/app/page.module.scss'
import { IYoutubeItem } from '@/type/YoutubeApiResponse'

interface IProps {
  searchResult: IYoutubeItem[] | []
}

const SearchList = ({ searchResult }: IProps): React.ReactElement => {
  return (
    <div className="inner-box">
      <ul className={styles.videoList}>
        {searchResult.map((video: IYoutubeItem) => {
          const VIDEO = video.snippet
          return (
            <li className={styles.videoCard} key={video.id.videoId}>
              <Link
                className={styles.videoLink}
                href={{
                  pathname: `/detail/${video.id.videoId}`,
                }}
              >
                <div>
                  <img
                    className={styles.videoImage}
                    src={VIDEO.thumbnails.medium.url}
                    width={300}
                  />
                </div>
                <div className={styles.title}>
                  <h4>{VIDEO.title}</h4>
                </div>
              </Link>
              <Link
                className={styles.videoLink}
                href={{
                  pathname: `/detail/${video.id.videoId}`,
                }}
              >
                <div className={styles.channelTitle}>
                  <span>{VIDEO.channelTitle}</span>
                </div>
              </Link>
              <div className={styles.publishedAt}>
                <span>{formatRelativeDate(VIDEO.publishedAt)}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SearchList
