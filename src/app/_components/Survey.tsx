'use client'

import { useState, useEffect } from 'react'
import { surveyAnalysis } from '@/utils/apiRequest/surveyApiRequest'
import styles from '@/app/page.module.scss'
import SurveyGraph from './SurveyGraph'
import SurveyModal from './SurveyModal'
/**
 * 체크 박스를 클릭 한다 => 체크한 값이 state에 담긴다
 * 담긴 값을 db의 형식에 맞게 보낸다
 * db 에서 정보를 가져온다
 */
interface ICheckList {
  title: string
  key: string
}

interface ISurvey {
  question: string
  checkList: ICheckList[]
}

const Survey = () => {
  const [surveyData, setSurveyData] = useState<ISurvey[]>([])
  const [isClicked, setIsClicked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchSurveyData = async () => {
      const data = await surveyAnalysis()
      if (data) {
        setSurveyData(data)
      }
    }
    fetchSurveyData()
  }, [])

  const handleClick = () => {
    setIsClicked(true)
    setIsModalOpen(!isModalOpen)
  }
  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const surveyList: ISurvey[] = [
    {
      question: '여러분은 산타를 몇살까지 믿었나요?',
      checkList: [
        { title: '👶0~5세', key: 'first_baby' },
        { title: '🧑6~10세', key: 'first_child' },
        { title: '👦11~20세', key: 'first_teenager' },
        { title: '👨‍🦰20세 이상', key: 'first_adult' },
        { title: '🎅아직도 믿음', key: 'first_stilltrust' },
      ],
    },
    {
      question: '마음에 들지 않은 선물을 받았을 때 어떻게 하시나요?',
      checkList: [
        { title: '🗑몰래 버린다', key: 'second_pretend' },
        { title: '💣솔직하게 말한다', key: 'second_pokerface' },
        { title: '🤖포커페이스를 한다', key: 'second_honest' },
        { title: '💔마음에 드는 척한다', key: 'second_throwaway' },
        { title: '🧱당근마켓에 판매한다', key: 'second_sell' },
      ],
    },
    {
      question: '크리스마스에 가장 받고 싶은 선물은 무엇인가요?',
      checkList: [
        { title: '💸현금', key: 'third_money' },
        { title: '✈여행 티켓', key: 'third_electronics' },
        { title: '💻최신 전자제품', key: 'third_clothes' },
        { title: '👔인기 브랜드 의류', key: 'third_travelticket' },
        { title: '😇받고 싶은 선물이 없다.', key: 'third_none' },
      ],
    },
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
          <div className="btn btn--darkRed" onClick={handleClick}>
            {isClicked && isModalOpen && (
              <SurveyModal
                handleModalClose={handleModalClose}
                // submitSurveyData={submitSurveyData}
                surveyList={surveyList}
              />
            )}
            설문 참여하기
          </div>
        </div>
        <SurveyGraph
          surveyData={surveyData}
          surveyList={surveyList}
        />
      </div>
    </section>
  )
}

export default Survey
