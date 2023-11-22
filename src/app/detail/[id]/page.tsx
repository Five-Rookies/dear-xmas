"use client"

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './detail.module.scss'
import { IVideo  } from '@/type/Api'


const Detail = (props: any) => {
  const searchParams = useSearchParams();
  const getItem = searchParams.get('videoInfo');
  const getItemInfo = JSON.parse(decodeURIComponent(getItem!));
  console.log(getItemInfo);
  const videoData = require(`/public/videos/searchByChannels/search-by-channel-id-${props.params.id}`).items
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
            <img className={styles.videoInfoImg} src={getItemInfo.thumbnails.high.url} alt={getItemInfo.title} />
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
        {videoData.map((item: IVideo, idx: number) => (
            <li key={idx} className={styles.listItem}>
              <Link href={`https://www.youtube.com/watch?v=${item.id.videoId}`} className={styles.listLink}>
                <figure className={styles.listImg}>
                  <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
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
      </div>
    </main>
  )
}

export default Detail;