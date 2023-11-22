'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import formatRelativeDate from '@/utils/relativeDate'
import styles from '@/app/mainList/page.module.scss'
import SEARCH_LIST from '@public/videos/searchByChannels/search-by-channel-id-UC1x03ziDHPct2xTikLyfMDA.json'

interface Thumbnails {
  default: {
    url: string
    width: number
    height: number
  }
  medium: {
    url: string
    width: number
    height: number
  }
  high: {
    url: string
    width: number
    height: number
  }
}

interface Snippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: Thumbnails
  channelTitle: string
  liveBroadcastContent: string
  publishTime: string
}

interface Id {
  kind: string
  videoId: string
}

interface Items {
  kind: string
  etag: string
  id: Id
  snippet: Snippet
}

const Search = (): React.ReactElement => {
  const searchParams = useSearchParams()
  const search = searchParams.get('info')
  const ACCESS_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  const [filteredItems, setFilteredItems] = useState<Items[]>([])

  const handleSearch = async () => {
    if (!search) return

    const URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${search}&type=video&key=${ACCESS_KEY}`
    try {
      const response = await axios.get(URL)
      const ITEM = response.data.items
      const filteredItems: Items[] = ITEM?.filter((el: Items): boolean => {
        return el.snippet.title.includes(search ? search : '')
      })
      setFilteredItems(filteredItems || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    // handleSearch()
    setFilteredItems(SEARCH_LIST.items)
  }, [search])

  return (
    <div className={styles.innerBox}>
      <ul className={styles.videoList}>
        {filteredItems.map((item: Items, index: number) => {
          const VIDEO = item.snippet
          return (
            <li key={VIDEO.title} className={styles.videoCard}>
              <Link href="">
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
              <Link href="">
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
