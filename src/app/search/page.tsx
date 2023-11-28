'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import formatRelativeDate from '@/utils/relativeDate'
import { IYoutubeItem } from '@/type/Api'
import youtubeDataRequest from '@/utils/apiRequest/youtubeApiRequest'
import styles from '../page.module.scss'

const Search = (props: any): React.ReactElement => {
  const searchParams = useSearchParams()
  const search = searchParams.get('info')
  const [filteredItems, setFilteredItems] = useState<IYoutubeItem[]>([])
   
  const handleSearch = async () => {
    if (!search) return
    const response = await youtubeDataRequest('search', `&q=${search}`, 25)
    const filtered: IYoutubeItem[] = response.items.filter(
      (el: IYoutubeItem): boolean => {
        return el.snippet.title.includes(search || '')
      },
    )
    setFilteredItems(filtered || [])
  }
  useEffect(() => {
    handleSearch()
    
  }, [search])

  //처음 검색해서 영상목록 받아오는 코드
  //URI가 들어오면 영상목록을 검색하지 않고 바로 추가
  // const onSearch = (e) => {
    
  // }

  return (
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

export default Search
