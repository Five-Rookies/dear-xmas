'use client'

import React, { useState, useEffect } from 'react'
import { updateSurveyData } from '@/utils/apiRequest/surveyApiRequest'
import styles from './Modal.module.scss'
import ISurvey from '@/type/SupabaseResponse'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const SurveyModal = ({surveyData, setSurveyData, questionList, handleModalClose}: any) => {
  const [checkBoxValues, setCheckBoxValues] = useState([])


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const parentLi = event.target.closest('li');
    const key = parentLi?.dataset.key
    
    console.log(parentLi)
    console.log(parentLi && `key는??? ${key}`)
    
    const updatedSurveyData = surveyData[0].slice(2, 5).map((data) => {
      if (data.id === value) {
        return { ...data, isChecked: checked };
      }
      return data;
    });
    
    setSurveyData(updatedSurveyData); // setSurveyData 함수 사용
  };
  

  const handleSubmit = async () => {
    const updatedSurveyData = surveyData[0]
    const id = updatedSurveyData.id
    const first_question = updatedSurveyData.first_question
    const second_question = updatedSurveyData.second_question
    const third_question = updatedSurveyData.third_question
  
    try {
      await updateSurveyData(first_question, second_question, third_question, id)
      alert('설문조사가 제출되었습니다.')
      handleModalClose()
    } catch (error) {
      console.error(error)
      alert('설문조사 제출에 실패했습니다.')
    }
  }
  


  useEffect(() => {
    // 모달이 열릴 때 body의 overflow를 hidden으로 설정
    document.body.style.overflow = 'hidden'

    return () => {
      // 모달이 닫힐 때 body의 overflow를 초기 상태로 복원
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className={styles.modal} onClick={handleModalClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>설문조사</h2>
        <ul>
          {surveyData.length > 0 &&
            Object.entries(surveyData[0]).slice(2, 5).map(([key,value], index) => {
              const valueCount = Object.keys(surveyData[0][key]).length
              const data = Object.keys(surveyData[0][key])
              const dataValue = Object.values(surveyData[0][key])
              const id = dataValue[0]
              console.log(index)
              return (
                <li key={index}>
                  <p className={styles.subTitle}>{`Q. ${questionList[index]}`}</p>
                  <div className={styles.labelContent}>
                    {Array.from({ length: valueCount - 1 }).map((_, valueIndex) => {
                      return (
                        <div className={styles.checkbox}>
                          <input
                            type="checkbox"
                            name="checkbox"
                            id={`${index + 1}-${valueIndex + 1}`}
                            onChange={handleCheckboxChange}
                          />
                          <label htmlFor={`${index + 1}-${valueIndex + 1}`} className={styles.label}>
                            <svg className={styles.checkboxSvg} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <mask id={`path-${valueIndex + 1}-inside-${valueIndex + 1}_476_5-37`} fill="white">
                                <rect width="200" height="200"></rect>
                              </mask>
                              <rect width="200" height="200" className={styles.checkboxSquare} strokeWidth="40" mask={`url(#path-${valueIndex + 1}-inside-${valueIndex + 1}_476_5-37)`}></rect>
                              <path className={styles.checkboxTick} d={`M52 111.018L76.9867 136L149 64`} strokeWidth="15"></path>
                            </svg>
                            <span className={styles.labelText}>{Object.keys(surveyData[0][key])[valueIndex + 1]}</span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </li>
              );
            })}
        </ul>
        <div className={styles.btnGroup}>
          <button className={styles.submitBtn} onClick={handleSubmit}>제출하기</button>
          <button className={styles.closeBtn} onClick={handleModalClose}><FontAwesomeIcon icon={faXmark} /></button>
        </div>
      </div>
    </div>
  )
}

export default SurveyModal
