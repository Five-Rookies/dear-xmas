import React from 'react'
import VideoList from '@/components/home/VideoList'
import styles from './page.module.scss'
import Image from 'next/image'


const Home = () => {
  return (
    <main className="main-container">
      <section className={styles.bg}>
        {/* <img className={styles.snowman} src="/assets/snowman.png" alt="" /> */}
        <Image
          className={styles.snowman}
          src="/assets/snowman.png"
          width={0}
          height={0}
          sizes="12rem"
          style={{width: '12rem', height: 'auto'}}
          alt=""
        />
        <div className={styles.snowBgSecond}>
          <ul className={styles.tree}>
            <li>
              {/* <img src="/assets/tree.png" alt="" /> */}
              <Image
                src="/assets/tree.png"
                width={0}
                height={0}
                sizes="5rem"
                style={{width: '5rem', height: 'auto'}}
                alt=""
              />
            </li>
            <li>
              <Image
                src="/assets/tree.png"
                width={0}
                height={0}
                sizes="5rem"
                style={{width: '5rem', height: 'auto'}}
                alt=""
              />
            </li>
            <li>
              <Image
                src="/assets/tree.png"
                width={0}
                height={0}
                sizes="5rem"
                style={{width: '5rem', height: 'auto'}}
                alt=""
              />
            </li>
            <li>
              <Image
                src="/assets/tree.png"
                width={0}
                height={0}
                sizes="5rem"
                style={{width: '5rem', height: 'auto'}}
                alt=""
              />
            </li>
            <li>
              <Image
                src="/assets/tree.png"
                width={0}
                height={0}
                sizes="5rem"
                style={{width: '5rem', height: 'auto'}}
                alt=""
              />
            </li>
            <li>
              <Image
                src="/assets/tree.png"
                width={0}
                height={0}
                sizes="5rem"
                style={{width: '5rem', height: 'auto'}}
                alt=""
              />
            </li>
            <li>
              <Image
                src="/assets/tree.png"
                width={0}
                height={0}
                sizes="5rem"
                style={{width: '5rem', height: 'auto'}}
                alt=""
              />
            </li>
          </ul>
        </div>
        <div className={styles.snowBgSecond}></div>
        <div className={styles.snowBg}></div>
        {/* <img className={styles.santa} src="/assets/santa.png" alt="" /> */}
        <Image
          className={styles.santa}
          src="/assets/santa.png"
          width={0}
          height={0}
          sizes="30rem"
          style={{width: '30rem', height: 'auto'}}
          alt=""
        />
      </section>
      <section className="inner-box">
        <VideoList />
      </section>
    </main>
  )
}

export default Home
