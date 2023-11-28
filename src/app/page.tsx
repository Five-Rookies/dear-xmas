import React from 'react'
import { IYoutubeItem } from '@/type/Api'
import VideoList from '@/components/home/VideoList'
import youtubeDataRequest from '@/utils/apiRequest/youtubeApiRequest'
import styles from './page.module.scss'

type VideoListType = IYoutubeItem[]

export const getVideoList = async (pageToken?: string) => {
  const response = await youtubeDataRequest('popular', '&q=크리스마스|크리스마스영화', 4, pageToken);
  return response.items
}

const Home = async () => {
  const videoList: VideoListType = await getVideoList()

  return (
    <main className="main-container">
      <section className={styles.bg}>
        <img className={styles.snowman} src="/assets/snowman.png" alt="" />
        <div className={styles.snowBgSecond}>
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
        </div>
        <div className={styles.snowBgSecond}></div>
        <div className={styles.snowBg}></div>
        <img className={styles.santa} src="/assets/santa.png" alt="" />
      </section>
      <section className="inner-box">
        <VideoList 
          videoList={videoList} 
        />
      </section>
    </main>
  )
}

export default Home