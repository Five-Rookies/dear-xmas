import React from 'react'
import { IYoutubeItem } from '@/type/Api'
import VideoList from '@/components/home/VideoList'
import youtubeDataRequest from '@/utils/apiRequest/youtubeApiRequest'
import styles from './page.module.scss'

type VideoListType = IYoutubeItem[]

const getVideoList = async (): Promise<VideoListType> => {
  const response = await youtubeDataRequest()

  return response.items
}

const Home = async () => {
  const videoList: VideoListType = await getVideoList()

  return (
    <main className="main-container">
      <section className={styles.bg}>
        <div className={styles.snowBgSecond}></div>
        <ul className={styles.tree}>
          <li>
            <img src="/assets/tree.png" alt="" />
          </li>
          <li>
            <img src="/assets/tree.png" alt="" />
          </li>
          <li>
            <img src="/assets/tree.png" alt="" />
          </li>
          <li>
            <img src="/assets/tree.png" alt="" />
          </li>
        </ul>
        <div className={styles.snowBg}></div>
        <img className={styles.santa} src="/assets/santa.png" alt="" />
      </section>
      <section className="inner-box">
        <VideoList videoList={videoList} />
      </section>
    </main>
  )
}

export default Home
