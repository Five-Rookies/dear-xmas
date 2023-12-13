'use client'
import useYoutubeDataRequest from '@/hooks/useYoutubeApiRequest'
import styles from '../live.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const LiveStream = ({
  scheduling,
  videoId,
  thumbnail,
}: {
  scheduling: string
  videoId: string
  thumbnail: string
}) => {
  const [isLive, setIsLive] = useState(false)
  const checkLiveTime = () => {
    const difference = new Date(scheduling).getTime() - new Date().getTime()
    if (difference <= 0) {
      return setIsLive(true)
    }
  }

  useEffect(() => {
    checkLiveTime()
    const interval = setInterval(() => {
      checkLiveTime()
    }, 1000)
    return () => clearInterval(interval)
  }, [!isLive])

  return (
    <div className={styles.liveStreamContainer}>
      <figure className={styles.liveStreamBox}>
        {isLive ? (
          <iframe
            className={styles.liveVideo}
            src={`https://www.youtube.com/embed/${videoId}`}
            width="100%"
            height="100%"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <Image
            src={thumbnail}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            layout="responsive"
            alt={videoId}
          />
        )}
      </figure>
    </div>
  )
}

export default LiveStream
