'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import formatRelativeDate from '@/utils/relativeDate'
import { IYoutubeItem } from '@/type/Api'
import useYoutubeDataRequest from '@/hooks/useYoutubeApiRequest'
import styles from '../page.module.scss'
import Image from 'next/image'
import NoResult from './NoResult'

const Search = (): React.ReactElement => {
  const searchParams = useSearchParams()
  const search = searchParams.get('info')
  const [filteredItems, setFilteredItems] = useState<IYoutubeItem[]>([])
  const [pageToken, setPageToken] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const currentSearchResult = useYoutubeDataRequest(
    'search',
    `&q=${search}`,
    25,
    pageToken
  )
  const scrolledItems = 4
  const [displayCount, setDisplayCount] = useState(scrolledItems)

  const handleSearch = async () => {
    if (!search) return
    const filtered: IYoutubeItem[] = currentSearchResult!.items.filter(
      (el: IYoutubeItem): boolean => {
        return el.snippet.title.includes(search || '')
      },
    )
    setFilteredItems(filtered || [])
  }

  const fetchMoreVideos = useCallback(async () => {
    if (isLoading) return

    try {
      setIsLoading(true)
      const nextPageVideos = currentSearchResult!.items
      if (nextPageVideos.length > 0) {
        setFilteredItems(prevVideos => [...prevVideos, ...nextPageVideos])
        setPageToken(currentSearchResult!.nextPageToken)
      }
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, currentSearchResult])
  
  useEffect(() => {
    if (currentSearchResult) {
      handleSearch()
    }

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight
      const { scrollHeight } = document.documentElement
      const isNearBottom = scrollY + windowHeight >= scrollHeight - 200

      if (isNearBottom && !isLoading && currentSearchResult) {
        setDisplayCount((prevDisplayCount) => prevDisplayCount + scrolledItems)
        fetchMoreVideos()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [search, currentSearchResult])

  return (
  <>
    {filteredItems.length ? (
      <>
      {filteredItems.length ? (
        <div className="inner-box">
            <ul className={styles.videoList}>
              {filteredItems.map((video: IYoutubeItem) => {
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
                        <Image
                          className={styles.videoImage}
                          src={VIDEO.thumbnails.medium.url}
                          width={0}
                      height={0}
                      sizes="18.15rem"
                      style={{width: '18.15rem', height: 'auto'}}
                      alt={VIDEO.title}
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
      ) : (
      <NoResult />
    )}
  </>
      ) : (
        <NoResult />
      )}
    </>
  )
}

export default Search
