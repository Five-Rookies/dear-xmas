'use client'

import React, { useState } from 'react'
import Comments from '@/type/SupabaseRespons'
import formatRelativeDate from '@/utils/relativeDate'
import {
  deleteComments,
  updateComments,
} from '@/utils/apiRequest/commentsApiRequest'
import Image from 'next/image'
import santa from '@public/assets/profile-santa.svg'
import snowman from '@public/assets/profile-snowman.svg'
import candle from '@public/assets/profile-candle.svg'
import cookie from '@public/assets/profile-cookie.svg'
import likeIcon from '@public/assets/like.svg'
import styles from './detail.module.scss'

const Comment = ({ comment }: { comment: Comments }) => {
  const [isDotMenuVisible, setIsDotMenuVisible] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(comment.text)
  const profiles = [santa, snowman, candle, cookie]

  const handleDotMenu = () => {
    setIsDotMenuVisible(!isDotMenuVisible)

    // dotMenu에 5초 이상 이벤트가 없으면 다시 닫힘
    if (!isDotMenuVisible) {
      setTimeout(() => {
        setIsDotMenuVisible(false)
      }, 5000)
    }
  }

  const handleInputChage = e => {
    setInputValue(e.target.value)
  }

  const handleEditButton = () => {
    setIsDotMenuVisible(!isDotMenuVisible)
    setIsEditing(true)
  }

  const handleEditCompleteButton = async () => {
    const text = inputValue
    const { like_num } = comment
    const { id } = comment
    await updateComments(text, like_num, id)
    setIsEditing(false)
  }

  const handleDeleteButton = () => {
    setIsDotMenuVisible(!isDotMenuVisible)
    deleteComments(comment.id)
  }

  return (
    <div className={styles.commentContainer}>
      <Image src={profiles[comment.img_path]} alt="프로필 이미지" />
      <div className={styles.commentDetail}>
        <p className={styles.userInfo}>
          {comment.user_name}
          <span>&nbsp;· {formatRelativeDate(comment.created_at)}</span>
        </p>
        {isEditing ? (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <input
              className={styles.text}
              value={inputValue}
              onChange={handleInputChage}
            />
            <button
              onClick={handleEditCompleteButton}
              style={{ width: '5rem' }}
            >
              수정 완료
            </button>
          </div>
        ) : (
          <p className={styles.text}>{comment.text}</p>
        )}
        <button>
          <Image src={likeIcon} alt="좋아요" />
          <span>{comment.like_num}</span>
        </button>
      </div>
      <p
        className={
          isDotMenuVisible
            ? `${styles.moreBtn} ${styles.active}`
            : styles.moreBtn
        }
        onClick={handleDotMenu}
      >
        ⋮
      </p>
      {isDotMenuVisible && (
        <div className={styles.dotMenu}>
          <button onClick={() => handleEditButton()}>수정</button>
          <button onClick={() => handleDeleteButton()}>삭제</button>
        </div>
      )}
    </div>
  )
}
export default Comment
