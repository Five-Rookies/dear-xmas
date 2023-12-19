'use client'

import { useState, useEffect } from 'react'
import { getSurveyData, submitSurveyData } from '@/utils/apiRequest/surveyApiRequest'
import styles from '@/app/page.module.scss'
import SurveyGraph from './SurveyGraph'
import SurveyModal from './SurveyModal'

const Survey = () => {
  const [surveyData, setSurveyData] = useState<ISurvey[]>([])
  const [isClicked, setIsClicked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  
  useEffect(() => {
    const fetchSurveyData = async () => {
      const data = await getSurveyData()
      if (data) {
        setSurveyData(data)
      }
    }
    fetchSurveyData()
  }, [])
  console.log(surveyData)
  
  //const dataObj = surveyData[0] && Object.entries(surveyData[0]).slice(2,5)

  const handleClick = () => {
    setIsClicked(true)
    setIsModalOpen(!isModalOpen)
  }
  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  
  const questionList = [
    '여러분은 산타를 몇살까지 믿었나요?',
    '마음에 들지 않은 선물을 받았을 때 어떻게 하시나요?',
    '크리스마스에 가장 받고 싶은 선물은 무엇인가요?',
  ]

  return (
    <section id="survey" className={`${styles.mainCommon} ${styles.survey}`}>
      <div className="inner-box">
        <h2>Survey</h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <p>크리스마스 설문조사 결과를 확인해보세요</p>
          <div 
            className='btn btn--darkRed' 
            onClick={handleClick}
          >
            {isClicked && isModalOpen && 
              <SurveyModal 
                onClose={handleModalClose} 
                handleModalClose={handleModalClose}
                surveyData={surveyData}
                submitSurveyData={submitSurveyData}
                questionList={questionList}
              />
            }
            설문 참여하기
          </div>
        </div>
        <SurveyGraph 
          surveyData={surveyData} 
          setSurveyData={setSurveyData}
          questionList={questionList}
        />
      </div>
    </section>
  )
}

export default Survey
