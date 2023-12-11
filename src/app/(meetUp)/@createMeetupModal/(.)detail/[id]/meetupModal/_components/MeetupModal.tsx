'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './meetupModal.module.scss'
import { useRouter } from 'next/navigation'

const MeetupModal = (): React.JSX.Element => {
  const router = useRouter()
  const modalRef = useRef<null>(null)
  const [meetupTitle, setMeetupTitle] = useState<string>('')
  const [meetupScheduling, setMeetupScheduling] = useState<string>('')
  const [meetupContent, setMeetupContent] = useState<string>('')

  const onClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    if (modalRef.current === event.target) {
      router.back()
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
    <div
      className={styles.modalBackground}
      ref={modalRef}
      onClick={onClickOutside}
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h1>모임 만들기</h1>
        </div>
        <form>
          <div className={styles.modalBody}>
            <div className={styles.row}>
              <div className={styles.inputDiv}>
                <select className={styles.category}>
                  <option>카테고리</option>
                  <option>영화</option>
                  <option>전시회</option>
                  <option>여행</option>
                  <option>음식</option>
                  <option>공연</option>
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
              <input
                className={styles.input}
                type="text"
                placeholder="예약 시간을 선택해 주세요"
                onChange={e => setMeetupScheduling(e.target.value)}
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
              onClick={() => router.back()}
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
