import React from 'react'
import { IYoutubeItem } from '@/type/YoutubeApiResponse'
import useYoutubeDataRequest from '@/hooks/useYoutubeApiRequest'
import styles from '@/app/page.module.scss'
import MainMeetupList from './MainMeetupList'
import { getTodayMeetup } from '@/utils/apiRequest/meetupApiRequest'

const MeetupList = async () => {
  const todayMeetup = await getTodayMeetup()
  console.log('?', todayMeetup)
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
        <MainMeetupList todayMeetup={todayMeetup} />
      </div>
    </section>
  )
}

export default MeetupList
