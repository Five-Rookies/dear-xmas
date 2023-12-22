'use client'

import React, { useEffect, useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import updateServeyData from '@/utils/apiRequest/surveyApiRequest'
import ISurvey from '@/type/SupabaseResponse'
import ISupabase from '@/type/SupabaseResponse'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './Modal.module.scss'

const supabase = createClientComponentClient<ISupabase[]>()

const SurveyModal = ({
  surveyData: any,
  setSurveyData,
  questionList,
  labels,
  handleModalClose
}) => {
  const [userId, setUserId] = useState<string | undefined>('')
  const [loading, setLoading] = useState(false)
  const [selectedItems, setSelectedItems] = useState({
    first_baby: false,
    first_child: false,
    first_teenager: false,
    first_adult: false,
    first_stilltrust: false,
    second_pretend: false,
    second_pokerface: false,
    second_honest: false,
    second_throwaway: false,
    second_sell: false,
    third_money: false,
    third_electronics: false,
    third_clothes: false,
    third_travelticket: false,
    third_none: false,
  })

  const getUserId = async (): Promise<void> => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUserId(user?.id)
  }

  const handleCheckboxChange = (event: any) => {
    setSelectedItems({
      ...selectedItems,
      [event.target.name]: event.target.checked,
    })
  }

  const submitForm = async (event: any) => {
    event.preventDefault()
    setLoading(true)
    const { data, error } = await supabase
      .from('survey')
      .insert([{ selectedItems }])
    if (error) console.error('Error: ', error)
    else console.log('Success: ', data)
    setLoading(false)
  }
  
  useEffect(() => {
    getUserId()
    return () => setUserId('')
  }, [])


  useEffect(() => {
    //console.log(selectedItems)
  }, [selectedItems])

function getAnswers(selectedItems) {
  const checkedAnswers = Object.keys(selectedItems)
    .filter(value => selectedItems[value] === true);
  
  return checkedAnswers;
}

const checkedAnswers = getAnswers(selectedItems);
const firstAnswer = checkedAnswers[0]
const secondAnswer = checkedAnswers[1]
const thirdAnswer = checkedAnswers[2]

// 값이 true인 선택된 checkbox들 출력


const handleSubmit = async (event: any) => {
  event.preventDefault()
  await updateServeyData(
    userId,
    firstAnswer,
    secondAnswer,
    thirdAnswer
  )
  
}

  return (
    <div className={styles.modal} onClick={handleModalClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h2 className={styles.title}>설문조사</h2>
        <form className={styles.submitForm} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <p className={styles.subTitle}>{`Q. ${questionList[0]}`}</p>
            <div className={styles.checkboxContent}>
              <div className={styles.checkbox}>
                <label className={styles.label}>
                  <input
                    type="checkbox"
                    name="first_baby"
                    checked={selectedItems.first_baby}
                    onChange={handleCheckboxChange}
                  />
                  {labels[0][0]}
                </label>
              </div>
              <div className={styles.checkbox}>
                <label className={styles.label}>
                  <input
                    type="checkbox"
                    name="first_child"
                    checked={selectedItems.first_child}
                    onChange={handleCheckboxChange}
                  />
                  {labels[0][1]}
                </label>
              </div>
              <div className={styles.checkbox}>
                <label className={styles.label}>
                  <input
                    type="checkbox"
                    name="first_teenager"
                    checked={selectedItems.first_teenager}
                    onChange={handleCheckboxChange}
                  />
                  {labels[0][2]}
                </label>
              </div>
              <div className={styles.checkbox}>
                <label className={styles.label}>
                  <input
                    type="checkbox"
                    name="first_adult"
                    checked={selectedItems.first_adult}
                    onChange={handleCheckboxChange}
                  />
                  {labels[0][3]}
                </label>
              </div>
              <div className={styles.checkbox}>
                <label className={styles.label}>
                  <input
                    type="checkbox"
                    name="first_stilltrust"
                    checked={selectedItems.first_stilltrust}
                    onChange={handleCheckboxChange}
                  />
                  {labels[0][4]}
                </label>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <p className={styles.subTitle}>{`Q. ${questionList[1]}`}</p>
            <div className={styles.checkboxContent}>
              <div className={styles.checkbox}>
                <label className={styles.label}>
                  <input
                    type="checkbox"
                    name="second_pretend"
                    checked={selectedItems.second_pretend}
                    onChange={handleCheckboxChange}
                  />
                  {labels[1][0]}
                </label>
              </div>
              <div className={styles.checkbox}>
                <label className={styles.label}>
                  <input
                    type="checkbox"
                    name="second_pokerface"
                    checked={selectedItems.second_pokerface}
                    onChange={handleCheckboxChange}
                  />
                  {labels[1][1]}
                </label>
              </div>
              <div className={styles.checkbox}>
                <label className={styles.label}>
                  <input
                    type="checkbox"
                    name="second_honest"
                    checked={selectedItems.second_honest}
                    onChange={handleCheckboxChange}
                  />
                  {labels[1][2]}
                </label>
              </div>
              <div className={styles.checkbox}>
                <label className={styles.label}>
                  <input
                    type="checkbox"
                    name="second_throwaway"
                    checked={selectedItems.second_throwaway}
                    onChange={handleCheckboxChange}
                  />
                  {labels[1][3]}
                </label>
              </div>
              <div className={styles.checkbox}>
                <label className={styles.label}>
                  <input
                    type="checkbox"
                    name="second_sell"
                    checked={selectedItems.second_sell}
                    onChange={handleCheckboxChange}
                  />
                  {labels[1][4]}
                </label>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <p className={styles.subTitle}>{`Q. ${questionList[2]}`}</p>
            <div className={styles.checkboxContent}>
              <div className={styles.checkbox}>
                <label className={styles.label}>
                  <input
                    type="checkbox"
                    name="third_money"
                    checked={selectedItems.third_money}
                    onChange={handleCheckboxChange}
                  />
                  {labels[2][0]}
                </label>
              </div>
              <div className={styles.checkbox}>
                <label className={styles.label}>
                  <input
                    type="checkbox"
                    name="third_electronics"
                    checked={selectedItems.third_electronics}
                    onChange={handleCheckboxChange}
                  />
                  {labels[2][1]}
                </label>
              </div>
              <div className={styles.checkbox}>
                <label className={styles.label}>
                  <input
                    type="checkbox"
                    name="third_clothes"
                    checked={selectedItems.third_clothes}
                    onChange={handleCheckboxChange}
                  />
                  {labels[2][2]}
                </label>
              </div>
              <div className={styles.checkbox}>
                <label className={styles.label}>
                  <input
                    type="checkbox"
                    name="third_travelticket"
                    checked={selectedItems.third_travelticket}
                    onChange={handleCheckboxChange}
                  />
                  {labels[2][3]}
                </label>
              </div>
              <div className={styles.checkbox}>
                <label className={styles.label}>
                  <input
                    type="checkbox"
                    name="third_none"
                    checked={selectedItems.third_none}
                    onChange={handleCheckboxChange}
                  />
                  {labels[2][4]}
                </label>
              </div>
            </div>
          </div>
          <div className={styles.btnGroup}>
            <button className={styles.submitBtn} type="submit" disabled={loading}>
              제출하기
            </button>
            <button className={styles.closeBtn} onClick={handleModalClose}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SurveyModal
