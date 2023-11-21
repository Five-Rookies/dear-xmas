import React from 'react'
import Link from 'next/link'
import { IChannelVideo } from '@/type/Api'
import styles from './RelatedVedio.module.scss'

const RelatedVedio = ({ item }: { item: IChannelVideo }) => {
  return (
    <li className={styles.listItem}>
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
  )
}

export default RelatedVedio
