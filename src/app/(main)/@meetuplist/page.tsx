import React from 'react';
import styles from '@/app/page.module.scss'
import MainMeetupList from './_components/MainMeetupList';

const MeetupList = () => {
  return (
    <section id="streaming" className={`${styles.mainCommon} ${styles.streaming}`}>
      <div className='inner-box'>
        <h2>Streaming</h2>
        <p>현재 인기있는 촛불 모임에 참가해보세요!</p>
        <div className={styles.decoImage}>
          <img className={styles.star} src="/assets/star.png" alt="" />
          <img className={styles.candyStick} src="/assets/candystick.png" alt="" />
          <img className={styles.star} src="/assets/star.png" alt="" />
          <img className={styles.star} src="/assets/star.png" alt="" />
        </div>
        <MainMeetupList />
      </div>
    </section>
  );
};

export default MeetupList;