'use client'

import React, { useEffect, useState } from 'react'
import styles from '../meetup.module.scss'
import btn from '@/app/globalButton.module.scss'
import {
  updateMember,
  getMeetupList,
  getPrevMember,
} from '@/utils/apiRequest/meetupApiRequest'
import { IMeetupBoardData } from '../../@createMeetupModal/(.)detail/[id]/meetupModal/_components/_meetupModal/MeetupModal'
import { dateFomatter, dateDifference } from '@/utils/calculateTimeUntilDay'
import Link from 'next/link'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'
//import likeIcon from '@public/assets/like.svg'

const MeetupList = () => {
  const [isDotMenuVisible, setIsDotMenuVisible] = useState(false)
  const [createdMeetup, setCreatedMeetup] = useState([])
  const [userName, setUserName] = useState('')
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

  const fetchUser = async () => {
    const { data } = await supabase.auth.getSession()
    setUserName(data.session?.user.user_metadata.user_name)
  }

  useEffect(() => {
    fetchMeetupList()
    fetchUser()
  }, [])

  const handleAddMember = async (id: number, user_name: string) => {
    const prevMember = await getPrevMember(id)
    const memberArr = [...prevMember.member_list, userName]
    if ([...prevMember.member_list] || user_name.includes(userName)) {
      return alert('이미 참가하였습니다.')
    }
    await updateMember(id, memberArr)
  }

  return (
    <>
      {[...createdMeetup].map((meetup: IMeetupBoardData) => {
        return (
          <div key={meetup.id} className={styles.meetupList}>
            <div className={styles.meetupPost}>
              <div className={styles.titleArea}>
                <h2>
                  <span>{meetup.category}</span> <i>|</i> {meetup.meetup_title}
                </h2>
                <div className={styles.openNotice}>
                  <p>{dateFomatter(meetup?.scheduling)} 오픈예정</p>
                  <Link
                    href={`/detail/${meetup.video_id}`}
                    className={`${btn.button} ${btn.buttonGrayBg}`}
                  >
                    영상보기
                  </Link>
                  <button
                    onClick={() =>
                      handleAddMember(meetup?.id!, meetup?.user_name!)
                    }
                    className={`${btn.button} ${btn.buttonRed}`}
                  >
                    참가하기
                  </button>
                </div>
              </div>
              <p className={styles.writer}>
                <span>{meetup.user_name}</span> ·
                <span>{dateDifference(meetup?.created_at)}</span>
              </p>
              <div className={styles.textContent}>
                <p>{meetup.meetup_content}</p>
              </div>
              <div className={styles.buttonArea}>
                <div>
                  <button>
                    <img src="/assets/like.svg" alt="좋아요" />
                    <span>
                      {meetup.meetup_like_num ? meetup.meetup_like_num : 0}명
                    </span>
                  </button>
                  {/*<button>
                  <img src="/assets/like.svg" alt="댓글" />
                  <span>10개 댓글</span>
                  </button>*/}
                </div>
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
