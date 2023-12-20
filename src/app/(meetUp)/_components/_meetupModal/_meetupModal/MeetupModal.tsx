'use client'

import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'
import { createMeetupBoard } from '@/utils/apiRequest/meetupApiRequest'
import useStore from '@/status/store'
import { IMeetupBoardData } from '@/type/Component'
import dynamic from 'next/dynamic'
import styles from './meetupModal.module.scss'
import { Value, ValuePiece, IVideoDetailInfo } from '@/type/Component'

const DatePicker: React.ComponentType<any> = dynamic(
  () => import('../_datePicker/DatePicker'),
  {
    ssr: false,
  },
)

const MeetupModal = (): React.JSX.Element => {
  const router = useRouter()
  const modalRef = useRef<null>(null)

  const { videoDetailInfo, removeVideoDetailInfo } = useStore()
  const { channelId, title, channelTitle, currentVideoId, thumbnailUrl } =
    videoDetailInfo as IVideoDetailInfo

  const [meetupCategory, setMeetupCategory] = useState<string>('')
  const [meetupTitle, setMeetupTitle] = useState<string>('')
  const [meetupScheduling, setMeetupScheduling] = useState<Value>(new Date())
  const [meetupContent, setMeetupContent] = useState<string>('')
  const [userName, setUserName] = useState<string | undefined>('')
  const nowDate = new Date()

  const getUserName = async (): Promise<void> => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUserName(user?.user_metadata.user_name)
  }

  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    if (modalRef.current === event.target) {
      router.back()
      removeVideoDetailInfo()
    }
  }

  const onChangeValue = (event: ValuePiece): void => {
    setMeetupScheduling(event)
  }

  const renderCategoryOption = (): React.JSX.Element[] | undefined => {
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
        <option key={index} value={item === '카테고리' ? '' : item}>
          {item}
        </option>
      )
    })
  }

  const handleSubmitCreateMeetupBoard = async (
    event: FormEvent,
  ): Promise<void> => {
    event.preventDefault()

    if (meetupScheduling !== null && meetupScheduling < nowDate) {
      alert('시간 설정 확인해 주세요!')
      return
    }

    const data: IMeetupBoardData = {
      category: meetupCategory,
      meetup_title: meetupTitle,
      meetup_content: meetupContent,
      scheduling: meetupScheduling,
      user_name: userName,
      video_id: currentVideoId,
      thumbnail: thumbnailUrl,
      channel_id: channelId,
      channel_title: channelTitle,
      video_title: title,
      member_list: [],
    }

    try {
      console.log(data, channelTitle)
      await createMeetupBoard(data)
      alert('모임 생성 완료!')
      removeVideoDetailInfo()
      router.back()
    } catch (error) {
      console.error(error)
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
        <form
          className={styles.modalForm}
          onSubmit={handleSubmitCreateMeetupBoard}
        >
          <div className={styles.inputGroup}>
            <select
              required
              className={styles.category}
              onChange={event => setMeetupCategory(event.target.value)}
            >
              {renderCategoryOption()}
            </select>
            <input
              required
              className={`${styles.input} ${styles.inputTitle}`}
              type="text"
              placeholder="모임명을 입력해 주세요"
              onChange={e => setMeetupTitle(e.target.value)}
            />
          </div>

          <div className={styles.inputDiv}>
            <DatePicker
              required
              meetupScheduling={meetupScheduling}
              onChangeValue={onChangeValue}
            />
          </div>

          <div className={styles.inputDiv}>
            <textarea
              required
              className={`${styles.input} ${styles.inputContent}`}
              placeholder="모임 내용을 입력해 주세요"
              onChange={e => setMeetupContent(e.target.value)}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.actionButton}
              onClick={() => {
                removeVideoDetailInfo()
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
