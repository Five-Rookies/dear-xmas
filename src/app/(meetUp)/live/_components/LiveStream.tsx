'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import useStore from '@/status/store'
import { IMeetupBoardData } from '@/type/Component'
import styles from '../live.module.scss'

const LiveStream = ({ scheduling, video_id, thumbnail }: IMeetupBoardData) => {
  const [isLive, setIsLive] = useState(false)
  const { time } = useStore()
  const checkLiveTime = () => {
    const difference =
      new Date(scheduling as string).getTime() - new Date().getTime()
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
            src={`https://www.youtube.com/embed/${video_id}?autoplay=1&mute=1&start=${
              time || 0
            }`}
            width="100%"
            height="100%"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <Image
            src={thumbnail!}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            layout="responsive"
            alt={video_id!}
          />
        )}
      </figure>
    </div>
  )
}

export default LiveStream
