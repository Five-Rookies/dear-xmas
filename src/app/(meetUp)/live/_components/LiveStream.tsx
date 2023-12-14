'use client'
import styles from '../live.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react'

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

  const isSetStart = false //TODO: 채팅창에 #01:22 라고 보냈을때 #앞에 붙은 내용을 버튼형태로 만들고 해당 댓글을 클릭하면 세션 등에 저장해서 그 값을 초로 변환시키고, 그걸 하단 url에 적용

  return (
    <div className={styles.liveStreamContainer}>
      <figure className={styles.liveStreamBox}>
        {isLive ? (
          <iframe
            className={styles.liveVideo}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&start=${
              isSetStart ? isSetStart : 0
            }`}
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
