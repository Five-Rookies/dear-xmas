'use client'

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'
import { updateServeyData } from '@/utils/apiRequest/surveyApiRequest'
import { debounce } from 'lodash'
import styles from './Modal.module.scss'
import { ISurvey } from './Survey'

interface IProps {
  surveyList: ISurvey[]
  handleModalClose: () => void
}

const SurveyModal = ({ surveyList, handleModalClose }: IProps) => {
  const [userId, setUserId] = useState<string>('')
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

  const getUserName = async (): Promise<void> => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (!user) {
        throw error
      }
      return user?.user_metadata.user_name
    } catch (error) {
      alert('로그인 후 사용해주세요')
    }
  }

  useEffect(() => {
    // 모달이 열릴 때 body의 overflow를 hidden으로 설정
    document.body.style.overflow = 'hidden'
    return () => {
      // 모달이 닫힐 때 body의 overflow를 초기 상태로 복원
      document.body.style.overflow = 'auto'
    }
  })

  const getUserId = async (): Promise<void> => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUserId(user?.id!)
  }

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const userName = await getUserName()
    if (userName !== undefined) {
      setSelectedItems({
        ...selectedItems,
        [event.target.name]: event.target.checked,
      })
    }
  }

  useEffect(() => {
    getUserId()
    return () => setUserId('')
  }, [])

  function getAnswers(selectedList: Record<string, boolean>): string[] {
    const checkedAnswers: string[] = Object.keys(selectedList).filter(
      value => selectedList[value] === true,
    )

    return checkedAnswers
  }

  const checkedAnswers = getAnswers(selectedItems)
  const firstAnswer = checkedAnswers[0]
  const secondAnswer = checkedAnswers[1]
  const thirdAnswer = checkedAnswers[2]

  // 값이 true인 선택된 checkbox들 출력
  const handleSubmit = debounce(async (): Promise<void> => {
    try {
      await updateServeyData(userId, firstAnswer, secondAnswer, thirdAnswer)
      alert('설문이 완료되었습니다🎅🏻')
      handleModalClose()
    } catch (error) {
      console.error(error)
      alert('오류가 발생하였습니다!')
    }
  }, 500)

  return (
    <div className={styles.modal} onClick={handleModalClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h2 className={styles.title}>설문조사</h2>
        <form className={styles.submitForm}>
          {surveyList.map((ques: ISurvey, index: number) => {
            return (
              <div key={index} className={styles.row}>
                <p className={styles.subTitle}>{`Q. ${ques.question}`}</p>
                <div className={styles.checkboxContent}>
                  {ques.checkList.map(check => {
                    return (
                      <div className={styles.checkbox}>
                        <label className={styles.label}>
                          <input
                            type="checkbox"
                            name={check.key}
                            onChange={handleCheckboxChange}
                          />
                          {check.title}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
          <div className={styles.btnGroup}>
            <button
              className={styles.submitBtn}
              type="button"
              disabled={loading}
              onClick={handleSubmit}
            >
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
