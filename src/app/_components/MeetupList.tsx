import React from 'react'
import styles from '@/app/page.module.scss'
import { getTodayMeetup } from '@/utils/apiRequest/meetupApiRequestClient'
import MainMeetupList from './MainMeetupList'

const MeetupList = async () => {
  const todayMeetup = await getTodayMeetup()

  return (
    <section
      id="streaming"
      className={`${styles.mainCommon} ${styles.meetupList}`}
    >
      <div className="inner-box">
        <h2>Streaming</h2>
        <p>오늘 오픈되는 촛불 모임에 참가해보세요!</p>
        <div className={styles.decoImage}>
          <img className={styles.star} src="/assets/star.png" alt="" />
          <img
            className={styles.candyStick}
            src="/assets/candystick.png"
            alt=""
          />
          <img className={styles.leaf} src="/assets/leaf.png" alt="" />
          <img className={styles.star} src="/assets/star.png" alt="" />
          <img className={styles.star} src="/assets/star.png" alt="" />
        </div>
        {todayMeetup.length > 0 ? (
          <MainMeetupList todayMeetup={todayMeetup} />
        ) : (
          <span className={styles.liveNone}>
            오늘 라이브되는 영상이 없습니다
          </span>
        )}
      </div>
    </section>
  )
}

export default MeetupList
