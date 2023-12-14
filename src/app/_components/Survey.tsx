'use client'

import { useState } from 'react'
import styles from '@/app/page.module.scss'
import SurveyGraph from './SurveyGraph'

const Survey = () => {
  return (
    <section id="survey" className={`${styles.mainCommon} ${styles.survey}`}>
      <div className="inner-box">
       + <h2>Survey</h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <p>크리스마스 설문조사 결과를 확인해보세요</p>
          <button className='btn btn--darkRed'>설문 참여하기</button>
        </div>
        <SurveyGraph />
      </div>
    </section>
  )
}

export default Survey
