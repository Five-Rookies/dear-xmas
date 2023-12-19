'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import formatRelativeDate from '@/utils/relativeDate'
import styles from '@/app/page.module.scss'
import { IYoutubeItem } from '@/type/YoutubeApiResponse'
import youtubeApiRequest from '@/utils/youtubRequest/youtubeApiRequest'
import useScrollBottom from '@/hooks/useScrollBottom'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const isBottom: boolean = useScrollBottom(100)
  const currentPageToken = useRef<string>(pageToken)
  const [searchResult, setSearchResult] = useState<IYoutubeItem[] | []>(
    initialData,
  )

  const fetchMoreData = async () => {
    const { nextPageToken, items } = await youtubeApiRequest({
      q: keyword,
      maxResults: '12',
      pageToken: currentPageToken.current,
    })
    currentPageToken.current = nextPageToken
    setSearchResult(prevSearchResult => {
      return [...prevSearchResult, ...items]
    })
  }

  useEffect(() => {
    if (pageToken && isBottom) {
      fetchMoreData().catch(error => {
        console.error(error)
        alert('[ERROR] 사용중 오류가 발생했습니다. 데이터를 다시 조회합니다.')
        router.refresh()
      })
    }
  }, [isBottom])

  return (
    <div className="inner-box">
      <ul className={styles.videoList}>
        {searchResult.map((video: IYoutubeItem, index: number) => {
          const VIDEO = video.snippet
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
