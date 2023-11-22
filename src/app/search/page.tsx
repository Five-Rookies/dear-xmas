'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import formatRelativeDate from '@/utils/relativeDate'
import styles from '@/app/mainList/page.module.scss'
import { ISearch } from '@/type/Api'

const Search = (): React.ReactElement => {
  const searchParams = useSearchParams()
  const search = searchParams.get('info')
  const ACCESS_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  const [filteredItems, setFilteredItems] = useState<ISearch[]>([])

  const handleSearch = async () => {
    if (!search) return

    const URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${search}&type=video&regionCode=kr&key=${ACCESS_KEY}`
    try {
      const response = await axios.get(URL)
      const ITEM = response.data.items
      const filteredItems: ISearch[] = ITEM?.filter((el: ISearch): boolean => {
        return el.snippet.title.includes(search ? search : '')
      })
      setFilteredItems(filteredItems || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
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
