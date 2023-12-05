import React from 'react'
import Image from 'next/image'
import ChristmasCounter from '@/components/home/ChristmasCounter'
import styles from './page.module.scss'
import Streaming from '@/components/home/Streaming'
import Survey from '@/components/home/Survey'

const Home = () => {
  return (
    <main className="main-container">
      <section id="counter" className={`${styles.mainCommon} ${styles.bg}`}>
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
              sizes="6.5rem"
              style={{ width: '6.5rem', height: 'auto' }}
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
        <div className={styles.snowBg}>
          <h2>Introduce</h2>
          <p>Dear, Xmas에서 특별한 순간을 함께 만들어요! 분위기를 업시키는 노래와 <span>재미있는 콘텐츠로</span> 이번 크리스마스를 더 특별하게 기억해보아요.</p>
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
      <section id="streaming" className={`${styles.mainCommon} ${styles.streaming}`}>
        <div className={styles.decoImage}>
          <img className={styles.star} src="/assets/star.png" alt="" />
          <img className={styles.candyStick} src="/assets/candystick.png" alt="" />
          <img className={styles.star} src="/assets/star.png" alt="" />
          <img className={styles.star} src="/assets/star.png" alt="" />
        </div>
        <Streaming />
      </section>
      <section id="slot" className={`${styles.mainCommon} ${styles.slot}`}>
        <figure className={styles.slotArrow}>
          <img src="/assets/slot-arrow.png" alt="" />
        </figure>
        <figure className={styles.slotSanta}>
        <img src="/assets/slot-santa.png" alt="" />
        </figure>
        <div className={`inner-box ${styles.slotBox}`}>
          <h2>Slot</h2>
          <p>이번 크리스마스날의 운명을 확인해보세요</p>
          <div>
            <div className={styles.joyStick}>
              <span>start</span>
              <div></div>
            </div>
            <ul className={styles.slotContent}>
              <li><span>냄새나는</span></li>
              <li><span>지하철에서</span></li>
              <li><span>친구랑</span></li>
              <li><span>피자먹는다</span></li>
            </ul>
          </div>
        </div>
      </section>
      <Survey />
    </main>
  )
}

export default Home
