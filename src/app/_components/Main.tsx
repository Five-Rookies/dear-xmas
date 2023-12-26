import React from 'react'
import Image from 'next/image'
import styles from '@/app/page.module.scss'
import ChristmasCounter from './ChristmasCounter'

const Main = () => {
  return (
    <section id="counter" className={`${styles.mainCommon} ${styles.bg}`}>
      <Image
        className={`${styles.snow} ${styles.snow1}`}
        width={0}
        height={0}
        sizes="100%"
        style={{ width: '100%', height: 'auto', marginTop: '5rem' }}
        src="/assets/bg-snow.svg"
        priority
        alt=""
      />
      <Image
        className={`${styles.snow} ${styles.snow2}`}
        width={0}
        height={0}
        sizes="100%"
        style={{ width: '100%', height: 'auto', marginTop: '5rem' }}
        src="/assets/bg-snow.svg"
        priority
        alt=""
      />
      <img className={styles.snowman} src="/assets/snowman.png" alt="" />
      <ul className={styles.tree}>
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
      <div className={styles.snowBgSecond}></div>
      <div className={styles.snowBgSecond}></div>
      <div className={styles.snowBg}> </div>
      <div className={styles.introTextBox}>
        <div className="inner-box">
          <h2>Introduce</h2>
          <p>
            Dear, Xmas에서 특별한 순간을 함께 만들어요! 분위기를 업시키는 노래와
            <span>재미있는 콘텐츠로</span> <span>이번 크리스마스를</span> 더
            특별하게 기억해보아요.
          </p>
        </div>
      </div>
      <Image
        className={styles.santa}
        src="/assets/santa.png"
        width={480}
        height={452}
        sizes="(max-width: 768px) 100%, 30rem"
        alt=""
      />
      <ChristmasCounter />
    </section>
  )
}

export default Main
