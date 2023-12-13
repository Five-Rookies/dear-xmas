'use client'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import styles from './meetupModal.module.scss'
import { useRouter } from 'next/navigation'
import DatePicker from '../_datePicker/DatePicker'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'
import { User } from '@supabase/supabase-js'
import { createMeetupBoard } from '@/utils/apiRequest/meetupApiRequest'
import useStore from '@/status/store'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export interface IMeetupBoardData {
  category: string
  meetup_title: string
  meetup_content: string
  scheduling: Value
  user_name: string
  video_id: string
  thumbnail: string
}

const MeetupModal = ({
  currentVideoId,
}: {
  currentVideoId: string
}): React.JSX.Element => {
  const router = useRouter()
  const modalRef = useRef<null>(null)
  const { videoThumbnailUrl, removeThumbnailUrl } = useStore()
  const [meetupCategory, setMeetupCategory] = useState<string>('')
  const [meetupTitle, setMeetupTitle] = useState<string>('')
  const [meetupScheduling, setMeetupScheduling] = useState<Value>(new Date())
  const [meetupContent, setMeetupContent] = useState<string>('')
  const [user, setUser] = useState<User>()

  const getUserName = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    setUser(session?.user)
  }

  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    if (modalRef.current === event.target) {
      router.back()
    }
  }

  const onChangeValue = (event: ValuePiece) => {
    setMeetupScheduling(event)
  }

  const renderCategoryOption = (): React.JSX.Element[] => {
    const options = [
      '카테고리',
      '영화',
      '전시회',
      '여행',
      '음식',
      '공연',
      '음악',
    ]
    return options.map((item, index) => {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      )
    })
  }

  const handleSubmitCreateMeetupBoard = async (event: FormEvent) => {
    event.preventDefault()

    const data: IMeetupBoardData = {
      category: meetupCategory,
      meetup_title: meetupTitle,
      meetup_content: meetupContent,
      scheduling: meetupScheduling,
      user_name: user?.user_metadata.user_name,
      video_id: currentVideoId,
      thumbnail: videoThumbnailUrl,
    }

    try {
      await createMeetupBoard(data)
      alert('모임 생성 완료!')
      removeThumbnailUrl()
      router.back()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // 모달이 열릴 때 body의 overflow를 hidden으로 설정
    document.body.style.overflow = 'hidden'
    getUserName()

    return () => {
      // 모달이 닫힐 때 body의 overflow를 초기 상태로 복원
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div
      className={styles.modalBackground}
      ref={modalRef}
      onClick={handleClickOutside}
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h1>모임 만들기</h1>
        </div>
        <form onSubmit={handleSubmitCreateMeetupBoard}>
          <div className={styles.modalBody}>
            <div className={styles.row}>
              <div className={styles.inputDiv}>
                <select
                  className={styles.category}
                  onChange={event => setMeetupCategory(event.target.value)}
                >
                  {renderCategoryOption()}
                </select>
              </div>
              <div className={styles.inputDiv}>
                <input
                  className={`${styles.input} ${styles.inputTitle}`}
                  type="text"
                  placeholder="모임명을 입력해 주세요"
                  onChange={e => setMeetupTitle(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.inputDiv}>
              <DatePicker
                meetupScheduling={meetupScheduling}
                onChangeValue={onChangeValue}
              />
            </div>

            <div className={styles.inputDiv}>
              <textarea
                className={`${styles.input} ${styles.inputContent}`}
                placeholder="모임 내용을 입력해 주세요"
                onChange={e => setMeetupContent(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.actionButton}
              onClick={() => {
                removeThumbnailUrl()
                router.back()
              }}
            >
              취소
            </button>
            <button type="submit" className={styles.actionButton}>
              모임 생성
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MeetupModal
