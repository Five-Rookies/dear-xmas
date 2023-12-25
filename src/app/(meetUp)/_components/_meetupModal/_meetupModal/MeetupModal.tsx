'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createMeetupBoard } from '@/utils/apiRequest/meetupApiRequestClient'
import { Value, ValuePiece } from '@/type/Component'
import dynamic from 'next/dynamic'
import { IVideoInfoToCookie } from '@/utils/cookieServer'
import { getProfileByEmail } from '@/utils/apiRequest/profileApiRequest'
import { debounce } from 'lodash'
import { TMeetupBoard, TProfiles } from '@/type/SupabaseResponse'
import styles from './meetupModal.module.scss'

const DatePicker: React.ComponentType<any> = dynamic(
  () => import('../_datePicker/DatePicker'),
  {
    ssr: false,
  },
)

const MeetupModal = ({
  currentVideoInfo,
}: {
  currentVideoInfo: IVideoInfoToCookie | null
}): React.JSX.Element => {
  const router = useRouter()
  const modalRef = useRef<null>(null)

  const { videoId, channelTitle, title, channelId, thumbnailsUrl } =
    currentVideoInfo as IVideoInfoToCookie

  const [meetupCategory, setMeetupCategory] = useState<string>('')
  const [meetupTitle, setMeetupTitle] = useState<string>('')
  const [meetupScheduling, setMeetupScheduling] = useState<Value>(new Date())
  const [meetupContent, setMeetupContent] = useState<string>('')
  const [userName, setUserName] = useState<string | null>('')
  const [userEmail, setUserEmail] = useState<string | null>('')
  const nowDate = new Date()

  const fetchUser = async (): Promise<void> => {
    const userData: TProfiles = await getProfileByEmail()
    setUserName(userData?.user_name)
    setUserEmail(userData?.email)
  }

  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    if (modalRef.current === event.target) {
      router.back()
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

  const handleSubmitCreateMeetupBoard = debounce(async (): Promise<void> => {
    if (meetupScheduling !== null && meetupScheduling < nowDate) {
      alert('시간 설정 확인해 주세요!')
      return
    }

    const data: TMeetupBoard = {
      category: meetupCategory,
      meetup_title: meetupTitle,
      meetup_content: meetupContent,
      scheduling: meetupScheduling as string,
      user_name: userName,
      email: userEmail,
      video_id: videoId,
      thumbnail: thumbnailsUrl,
      channel_id: channelId,
      channel_title: channelTitle,
      video_title: title,
      member_list: [],
    }

    try {
      await createMeetupBoard(data)
      alert('모임 생성 완료!')
      router.back()
    } catch (error) {
      console.error(error)
    }
  }, 500)

  useEffect(() => {
    // 모달이 열릴 때 body의 overflow를 hidden으로 설정
    document.body.style.overflow = 'hidden'
    fetchUser()
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
        <form className={styles.modalForm}>
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
              onChange={event => setMeetupTitle(event.target.value)}
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
              onChange={event => setMeetupContent(event.target.value)}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.actionButton}
              onClick={() => {
                router.back()
              }}
            >
              취소
            </button>
            <button
              type="button"
              className={styles.actionButton}
              onClick={handleSubmitCreateMeetupBoard}
            >
              모임 생성
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MeetupModal
