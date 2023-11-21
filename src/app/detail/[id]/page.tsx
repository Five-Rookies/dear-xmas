'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { IChannelVideo } from '@/type/Api'
import RelatedVedio from '@/components/detail/RelatedVedio'

import styles from './detail.module.scss'

const Detail = (props: any) => {
  const searchParams = useSearchParams()
  const getVideoId = searchParams.get('id')
  const videoIdData = require(`/public/videos/popular`).items
  const [getItemInfo] = videoIdData.filter(
    (e: IChannelVideo) => e.id === getVideoId,
  )

  const router = useRouter()

  return (
    <main className={styles.detail}>
      <header className={styles.header}>
        <button type="button" onClick={() => router.back()}>
          <img src="/assets/left-arrow.png" alt="뒤로가기 아이콘" />
        </button>
        <h1>나만의 과제 이름</h1>
      </header>

      <figure className={styles.visual}>
        <iframe
          src={`https://www.youtube.com/embed/${getVideoId}`}
          width="100%"
          height="100%"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </figure>

      <div className={styles.videoInfo}>
        <div>
          <figure className={styles.videoInfoImgFrame}>
            <img
              className={styles.videoInfoImg}
              src={getItemInfo.snippet.thumbnails.high.url}
              alt={getItemInfo.snippet.title}
            />
          </figure>
        </div>
        <div>
          <h2 className={styles.videoInfoTitle}>{getItemInfo.snippet.title}</h2>
          <p>{getItemInfo.snippet.channelTitle}</p>
          <p>{getItemInfo.snippet.description}</p>
        </div>
      </div>

      <RelatedVedio id={props.params.id} />
    </main>
  )
}

export default Detail
