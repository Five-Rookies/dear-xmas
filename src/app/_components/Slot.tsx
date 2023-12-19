import React from 'react'
import styles from '@/app/page.module.scss'
import SlotContent from './SlotContent'

const Slot = () => {


  return (
    <section id="slot" className={`${styles.mainCommon} ${styles.slot}`}>
      <div className={`inner-box ${styles.slotWapper}`}>
        <div className={styles.textArea}>
          <h2>Slot</h2>
          <p>이번 크리스마스날의 운명을 확인해보세요</p>
        </div>
        <SlotContent />
      </div>
    </section>
  )
}

export default Slot
