'use client'

import React, { useEffect, useState } from 'react'
import styles from '../meetup.module.scss'
import btn from '@/app/globalButton.module.scss'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'
import { getMeetupList } from '@/utils/apiRequest/meetupApiRequest'
import { IMeetupBoardData } from '../../@createMeetupModal/(.)detail/[id]/meetupModal/_components/_meetupModal/MeetupModal'
//import likeIcon from '@public/assets/like.svg'

const MeetupList = () => {
  const [isDotMenuVisible, setIsDotMenuVisible] = useState(false)
  const [createdMeetup, setCreatedMeetup] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const handleDotMenu = () => {
    setIsDotMenuVisible(!isDotMenuVisible)

    // dotMenu에 5초 이상 이벤트가 없으면 다시 닫힘
    if (!isDotMenuVisible) {
      setTimeout(() => {
        setIsDotMenuVisible(false)
      }, 10000)
    }
  }
  const handleEditButton = () => {
    setIsDotMenuVisible(!isDotMenuVisible)
    setIsEditing(true)
  }

  const handleDeleteButton = async () => {
    setIsDotMenuVisible(!isDotMenuVisible)
    // deleteComments(comment.id)
    // await renderUpdatedComment()
  }

  const fetchMeetupList = async () => {
    const res = await getMeetupList()
    setCreatedMeetup(res)
  }

  useEffect(() => {
    fetchMeetupList()
  }, [])

  return (
    <>
      {createdMeetup.map((meetup: IMeetupBoardData) => {
        console.log(meetup)
        const originalDate = new Date(meetup?.scheduling?.toString() as string)

        const year = originalDate.getFullYear().toString().substr(-2) // 연도의 뒤 2자리
        const month = (originalDate.getMonth() + 1).toString().padStart(2, '0') // 월
        const day = originalDate.getDate().toString().padStart(2, '0') // 일
        const hours = originalDate.getHours().toString().padStart(2, '0') // 시
        const minutes = originalDate.getMinutes().toString().padStart(2, '0') // 분

        const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`

        return (
          <div className={styles.meetupList}>
            <div className={styles.meetupPost}>
              <div className={styles.titleArea}>
                <h2>
                  <span>{meetup.category}</span> <i>|</i> {meetup.meetup_title}
                </h2>
                <div className={styles.openNotice}>
                  <p>{formattedDate} 오픈예정</p>
                  <button className={`${btn.button} ${btn.buttonRed}`}>
                    참가하기
                  </button>
                </div>
              </div>
              <p className={styles.writer}>
                <span>{meetup.user_name}</span> ·
                <span>{meetup?.created_at}</span>
              </p>
              <div className={styles.textContent}>
                <p>{meetup.meetup_content}</p>
              </div>
              <div className={styles.buttonArea}>
                <div>
                  <button>
                    <img src="/assets/like.svg" alt="좋아요" />
                    <span>10명 좋아요</span>
                  </button>
                  {/*<button>
              <img src="/assets/like.svg" alt="댓글" />
              <span>10개 댓글</span>
              </button>*/}
                </div>
                <button className="btn btn--gray">영상 보러가기</button>
              </div>
              {/*<div className={styles.comment}>
          <input type="text" placeholder="하고 싶은 말을 적어봐요!" />
          <div className={styles.commentContainer}>
            <div>
              <p className={`${styles.comment} ${styles.writer}`}>
                <span>성냥팔이소녀</span> ·<span>1시간 전</span>
              </p>
              <button
                className={
                  isDotMenuVisible
                    ? `${styles.moreBtn} ${styles.active}`
                    : styles.moreBtn
                }
                onClick={handleDotMenu}
              >
                ⋮
              </button>
              {isDotMenuVisible && (
                <div className={styles.dotMenu}>
                  <button onClick={() => handleEditButton()}>수정</button>
                  <button onClick={() => handleDeleteButton()}>삭제</button>
                </div>
              )}
            </div>
            <p>
              2023년 많은 사항 받은 인기팝송 총모음.. 치열한 지하철에서
              크리스마스의 즐거움을 느낄 수 있는 .. 그런 .. 희망창 플레이
              리스트.. 모두
            </p>
          </div>
        </div>*/}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default MeetupList
