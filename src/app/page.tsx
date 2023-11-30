import React from 'react'
import VideoList from '@/components/home/VideoList'
import Image from 'next/image'
import ChristmasCounter from '@/components/home/ChristmasCounter'
import styles from './page.module.scss'

const Home = () => {
  return (
    <main className="main-container">
      <section className={styles.bg}>
        <Image
          className={styles.snow}
          width={0}
          height={0}
          sizes="100%"
          style={{ width: '100%', height: 'auto', marginTop: '5rem' }}
          layout="fiil"
          src="/assets/bg-snow.svg"
          alt=""
        />
        <img className={styles.snowman} src="/assets/snowman.png" alt="" />
        <div className={styles.snowBgSecond}>
          <ul className={styles.tree}>
            <li>
              {/* <img src="/assets/tree.png" alt="" /> */}
              <Image
                src="/assets/tree.png"
                width={0}
                height={0}
                sizes="5rem"
                style={{ width: '5rem', height: 'auto' }}
                alt=""
              />
            </li>
            <li>
              <Image
                src="/assets/tree.png"
                width={0}
                height={0}
                sizes="5rem"
                style={{ width: '5rem', height: 'auto' }}
                alt=""
              />
            </li>
            <li>
              <Image
                src="/assets/tree.png"
                width={0}
                height={0}
                sizes="5rem"
                style={{ width: '5rem', height: 'auto' }}
                alt=""
              />
            </li>
            <li>
              <Image
                src="/assets/tree.png"
                width={0}
                height={0}
                sizes="5rem"
                style={{ width: '5rem', height: 'auto' }}
                alt=""
              />
            </li>
            <li>
              <Image
                src="/assets/tree.png"
                width={0}
                height={0}
                sizes="5rem"
                style={{ width: '5rem', height: 'auto' }}
                alt=""
              />
            </li>
            <li>
              <Image
                src="/assets/tree.png"
                width={0}
                height={0}
                sizes="5rem"
                style={{ width: '5rem', height: 'auto' }}
                alt=""
              />
            </li>
            <li>
              <Image
                src="/assets/tree.png"
                width={0}
                height={0}
                sizes="5rem"
                style={{ width: '5rem', height: 'auto' }}
                alt=""
              />
            </li>
          </ul>
        </div>
        <div className={styles.snowBgSecond}></div>
        <div className={styles.snowBg}></div>

        <Image
          className={styles.santa}
          src="/assets/santa.png"
          width={0}
          height={0}
          sizes="30rem"
          style={{ width: '30rem', height: 'auto' }}
          alt=""
        />
        <ChristmasCounter />
      </section>
      <section className="inner-box">
        <VideoList />
      </section>
    </main>
  )
}

export default Home
