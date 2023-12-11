'use client'

import { useState } from 'react'
import styles from '@/app/page.module.scss'
import { surveyResult } from '@/utils/apiRequest/surveyApiRequest'
import SurveyGraph from './SurveyGraph'

const Survey = () => {
  // const [isToggleInnerShow, setToggleInnerShow] = useState(false);
  const [isToggleListShow, setToggleListShow] = useState(true)

  // const handleToggleInner = () => {
  //   setToggleInnerShow(!isToggleInnerShow);
  // };

  const toggleToggleList = () => {
    setToggleListShow(!isToggleListShow)
  }

  return (
    <section id="survey" className={`${styles.mainCommon} ${styles.survey}`}>
      <div className="inner-box">
       + <h2>Survey</h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '1rem',
          }}
        >
          <p>크리스마스 설문조사 결과를 확인해보세요</p>
          <button className={styles.closeAll} onClick={toggleToggleList}>
            전체 접기 ▼
          </button>
        </div>
        <SurveyGraph />
      </div>
    </section>
  )
}

export default Survey
