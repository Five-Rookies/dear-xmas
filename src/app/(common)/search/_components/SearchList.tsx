'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import formatRelativeDate from '@/utils/relativeDate'
import styles from '@/app/page.module.scss'
import { IYoutubeItem } from '@/type/YoutubeApiResponse'
import { setVideoInfoToCookie } from '@/utils/cookieClient'
import { useSearchParams } from 'next/navigation'
import youtubeRequest from '@/utils/youtubRequest/youtubeRequest'

const SearchList = (): React.ReactElement => {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('search-keyword')
  const [searchResult, setSearchResult] = useState<IYoutubeItem[]>([])

  useEffect(() => {
    const getSearchResults = async () => {
      if (!keyword) return
      const { itemList } = await youtubeRequest({
        apiType: 'search',
        optionalQuery: {
          q: keyword,
          maxResults: '20',
        },
      })
      const searchResults = itemList.filter((el: IYoutubeItem): boolean => {
        return el.snippet.title.includes(keyword)
      })

      setSearchResult(searchResults)
    }

    getSearchResults()
  }, [keyword])

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
                onClick={() => {
                  setVideoInfoToCookie({
                    channelTitle: video.snippet.channelTitle,
                    videoId: video.id.videoId,
                    channelId: video.snippet.channelId,
                    title: video.snippet.title,
                    thumbnailsUrl: video.snippet.thumbnails.medium.url,
                  })
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
