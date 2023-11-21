'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { IChannelVideo } from '@/type/Api'
import RelatedVedio from '@/components/detail/RelatedVedio'
import styles from './detail.module.scss'

const Detail = (props: any) => {
  const searchParams = useSearchParams()
  const getItem = searchParams.get('videoInfo')
  const getItemInfo = JSON.parse(decodeURIComponent(getItem!))
  console.log(getItemInfo)
  const videoData = require(
    `/public/videos/searchByChannels/search-by-channel-id-${props.params.id}`,
  ).items
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
        <img src={getItemInfo.thumbnails.high.url} alt={getItemInfo.title} />
      </figure>

      <div className={styles.videoInfo}>
        <div>
          <figure className={styles.videoInfoImgFrame}>
            <img
              className={styles.videoInfoImg}
              src={getItemInfo.thumbnails.high.url}
              alt={getItemInfo.title}
            />
          </figure>
        </div>
        <div>
          <h2 className={styles.videoInfoTitle}>{getItemInfo.title}</h2>
          <p>{getItemInfo.channelTitle}</p>
          <p>{getItemInfo.description}</p>
        </div>
      </div>

      <div>
        <h3>관련된 영상</h3>
        <ul className={styles.list}>
          {videoData.map((item: IChannelVideo, idx: number) => (
            <RelatedVedio key={idx} item={item} />
          ))}
        </ul>
      </div>
    </main>
  )
}

export default Detail
