import React from 'react'
import styles from '@/app/page.module.scss'

const Slot = () => {
  return (
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
            <li>
              <span>냄새나는</span>
            </li>
            <li>
              <span>지하철에서</span>
            </li>
            <li>
              <span>친구랑</span>
            </li>
            <li>
              <span>피자먹는다</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Slot
