'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import formatRelativeDate from '@/utils/relativeDate'
import styles from '@/app/mainList/page.module.scss'
import { ISearch } from '@/type/Api'
import youtubeApiRequest from '@/utils/apiRequest/youtubeApiRequest'

const Search = (): React.ReactElement => {
  const searchParams = useSearchParams()
  const search = searchParams.get('info')
  const [filteredItems, setFilteredItems] = useState<ISearch[]>([])

  const handleSearch = async () => {
    if (!search) return
    const response = await youtubeApiRequest(
      'search',
      `&q=${search}&type=video`,
      25,
    )
    const filtered: ISearch[] = response.filter((el: ISearch): boolean => {
      return el.snippet.title.includes(search || '')
    })
    setFilteredItems(filtered || [])
  }
  useEffect(() => {
    handleSearch()
  }, [search])

  return (
    <div className="inner-box">
      <ul className={styles.videoList}>
        {filteredItems.map((video: ISearch, index: number) => {
          const VIDEO = video.snippet
          return (
            <li className={styles.videoCard} key={video.id.videoId}>
              <Link
                className={styles.videoLink}
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
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
                // href={{
                //   pathname: `/detail/${video.id.videoId}`,
                // }}
                href=""
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
