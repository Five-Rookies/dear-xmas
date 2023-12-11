'use client'

import React, { useState } from 'react'
import styles from './../meetup.module.scss'
//import likeIcon from '@public/assets/like.svg'

const MeetupList = () => {
  const [isDotMenuVisible, setIsDotMenuVisible] = useState(false)
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

  return (
    <div className={styles.meetupList}>
      <div className={styles.meetupPost}>
        <div className={styles.titleArea}>
          <h2><span>영화</span> <i>|</i> 크리스마스에는 역시 나홀로 집에~!</h2>
          <div className={styles.openNotice}>
            <p>12/06 17:00 오픈예정</p>
            <button className='btn btn--red'>참가하기</button>
          </div>
        </div>
        <p className={styles.writer}>
          <span>쿠키맨</span> ·
          <span>1분전</span>
        </p>
        <div className={styles.textContent}>
          <p>안녕하세요 나홀로집에 함꼐 봐주실 촛불님들 구합니다. <br/>
          1편부터 보려고 해요!
          함께 감상하실분 계신가요?????<br/>
          혹시 음식도 추천해주실 분 계신다면 아래 댓글로 남겨주시면 감사하겠습니다. <br/>
          저는 팝콘 먹을거에요~!
          </p>
          
        </div>
        <div className={styles.buttonArea}>
          <div>
            <button>
              <img src="/assets/like.svg" alt="좋아요" />
              <span>10명 좋아요</span>
            </button>
            <button>
              <img src="/assets/like.svg" alt="댓글" />
              <span>10개 댓글</span>
            </button>
          </div>
          <button className="btn btn--gray">영상 보러가기</button>
        </div>
        <div className={styles.comment}>
          <input type="text" placeholder='하고 싶은 말을 적어봐요!' />
          <div className={styles.commentContainer}>
            <div>
              <p className={`${styles.comment} ${styles.writer}`}>
                <span>성냥팔이소녀</span> ·
                <span>1시간 전</span>
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
              2023년  많은 사항 받은 인기팝송 총모음.. 치열한 지하철에서 크리스마스의 즐거움을 느낄 수 있는 .. 그런 .. 희망창 플레이 리스트.. 모두
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeetupList
