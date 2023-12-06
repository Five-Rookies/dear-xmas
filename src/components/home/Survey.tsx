'use client'

import { useState } from 'react';
import styles from '@/app/page.module.scss'

const Survey = () => {
  // const [isToggleInnerShow, setToggleInnerShow] = useState(false);
  const [isToggleListShow, setToggleListShow] = useState(true);

  // const handleToggleInner = () => {
  //   setToggleInnerShow(!isToggleInnerShow);
  // };

  const toggleToggleList = () => {
    setToggleListShow(!isToggleListShow);
  };
    
  return (
    <section id="survey" className={`${styles.mainCommon} ${styles.survey}`}>
      <div className='inner-box'>
        <h2>Survey</h2>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '1rem'}}>
          <p>크리스마스 설문조사 결과를 확인해보세요</p>
          <button className={styles.closeAll} onClick={toggleToggleList}>전체 접기 ▼</button>
        </div>
        <div className={styles.toggleWrap}>
          <ul className={`${styles.toggleList} ${isToggleListShow ? '' : styles.hidden}`}>
            <li className={styles.toggleItem}>
              <button>Q. 여러분은 산타를 몇살까지 믿었나요?</button>
              <div className={styles.toggleInner}>
                <ul>
                  <li className={styles.toggleInnerItem}>
                    <div className={styles.ageArea}>
                      <img className={styles.emoji} src="/assets/emoji-baby.svg" alt="" />
                      <span>0~5세</span>
                    </div>
                    <div className={styles.graph}></div>
                  </li>
                  <li className={styles.toggleInnerItem}>
                    <div className={styles.ageArea}>
                      <img className={styles.emoji} src="/assets/emoji-child.svg" alt="" />
                      <span>6~10세</span>
                    </div>
                    <div className={styles.graph}></div>
                  </li>
                  <li className={styles.toggleInnerItem}>
                    <div className={styles.ageArea}>
                      <img className={styles.emoji} src="/assets/emoji-teenager.svg" alt="" />
                      <span>11~20세</span>
                    </div>
                    <div className={styles.graph}></div>
                  </li>
                  <li className={styles.toggleInnerItem}>
                    <div className={styles.ageArea}>
                      <img className={styles.emoji} src="/assets/emoji-adult.svg" alt="" />
                      <span>20세 이상</span>
                    </div>
                    <div className={styles.graph}></div>
                  </li>
                  <li className={styles.toggleInnerItem}>
                    <div className={styles.ageArea}>
                      <img className={styles.emoji} src="/assets/emoji-santa.svg" alt="" />
                      <span>아직도 믿음</span>
                    </div>
                    <div className={styles.graph}></div>
                  </li>
                </ul>
              </div>
            </li>
            <li className={styles.toggleItem}>
              <button>Q. 마음에 들지 않은 선물을 받았을 때 어떻게 하시나요?</button>
              <div></div>
            </li>
            <li className={styles.toggleItem}>
              <button>Q. 크리스마스에 가장 받고 싶은 선물은 무엇인가요?</button>
              <div></div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Survey;