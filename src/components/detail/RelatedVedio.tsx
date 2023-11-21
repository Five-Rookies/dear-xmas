import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { IChannelVideo } from '@/type/Api'
import styles from './RelatedVedio.module.scss'

const RelatedVedio = ({ id }: { id: string }) => {
  const [videoData, setVideoData] = useState<IChannelVideo[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/videos/searchByChannels/search-by-channel-id-${id}.json`,
        )
        setVideoData(response.data.items)
      } catch (error) {
        console.error('Failed to fetch video data', error)
      }
    }

    fetchData()
  }, [id])

  return (
    <section>
      <h3>관련된 영상</h3>
      <ul className={styles.list}>
        {videoData.map((item: IChannelVideo, idx: number) => (
          <li key={idx} className={styles.listItem}>
            <Link
              href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
              className={styles.listLink}
            >
              <figure>
                <img
                  src={item.snippet.thumbnails.medium.url}
                  alt={item.snippet.title}
                />
              </figure>
              <div>
                <h4 className={styles.listTitle}>{item.snippet.title}</h4>
                <p>{item.snippet.channelTitle}</p>
                <p>{item.snippet.publishedAt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RelatedVedio
