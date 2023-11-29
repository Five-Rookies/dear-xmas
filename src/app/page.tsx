import React from 'react'
import VideoList from '@/components/home/VideoList'
import styles from './page.module.scss'

const Home = () => {
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
        <VideoList />
      </section>
    </main>
  )
}

export default Home
