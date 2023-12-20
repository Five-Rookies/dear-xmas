'use client'

import React, { useState, useEffect } from 'react'
import formatRelativeDate from '@/utils/relativeDate'
import {
  checkLike,
  createLike,
  removeLike,
  getLike,
  countLike,
} from '@/utils/apiRequest/likeApiRequest'
import {
  deleteComments,
  updateComments,
} from '@/utils/apiRequest/commentsApiRequest'
import Image from 'next/image'
import santa from '@public/assets/profile-santa.svg'
import snowman from '@public/assets/profile-snowman.svg'
import candle from '@public/assets/profile-candle.svg'
import cookie from '@public/assets/profile-cookie.svg'
import likeOff from '@public/assets/likeOff.svg'
import likeOn from '@public/assets/likeOn.svg'
import Comments from '@/type/SupabaseResponse'
import styles from '../detail.module.scss'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'

interface ICommentProps {
  comment: Comments
  fetchComments: () => Promise<void>
}

interface ILike {
  comment_id: number
  created_at: string
  id: number
  is_like: boolean
  user_id: string
}

const Comment = ({ comment, fetchComments }: ICommentProps) => {
  const { id, user_name, comment_content, profile_img, created_at } = comment

  const COMMENT_ID: number = id
  const profiles: any[] = [santa, snowman, candle, cookie]
  const [isDotMenuVisible, setIsDotMenuVisible] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string | undefined>(
    comment_content,
  )

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [userId, setUserId] = useState<string | undefined>('')
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number | undefined>(0)

  const getUserId = async (): Promise<void> => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUserId(user?.id)
  }

  const handleClickCommentLike = async (): Promise<void> => {
    const checkIsLiked: ILike[] = await checkLike(userId, COMMENT_ID)

    if (checkIsLiked.length <= 0) {
      await createLike(userId, COMMENT_ID, true)
      setLikeCount(likeCount =>
        likeCount !== undefined ? likeCount + 1 : undefined,
      )
    }

    if (checkIsLiked.length > 0) {
      await removeLike(COMMENT_ID)
      setLikeCount(likeCount =>
        likeCount !== undefined ? likeCount - 1 : undefined,
      )
    }
    setIsLiked(!isLiked)
  }

  const handleClickDotMenu = (): void => {
    setIsDotMenuVisible(!isDotMenuVisible)
    // dotMenu에 5초 이상 이벤트가 없으면 다시 닫힘
    if (!isDotMenuVisible) {
      setTimeout(() => {
        setIsDotMenuVisible(false)
      }, 5000)
    }
  }

  const handleChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setInputValue(event?.target?.value)
  }

  const handleClickDeleteComment = async (): Promise<void> => {
    await deleteComments(COMMENT_ID)
    await fetchComments()
  }

  const handleClickEditButton = (): void => {
    setIsDotMenuVisible(!isDotMenuVisible)
    setIsEditing(true)
  }

  const handleClickEditComment = async (): Promise<void> => {
    const editValue: string | undefined = inputValue

    await updateComments(editValue, COMMENT_ID)
    setIsEditing(false)
    await fetchComments()
  }

  useEffect(() => {
    getUserId()
    return () => setUserId('')
  }, [])

  useEffect(() => {
    const fetchLike = async (): Promise<void> => {
      if (userId && COMMENT_ID) {
        const isLike: boolean = await getLike(userId, COMMENT_ID)
        const likeLength: number | undefined = await countLike(COMMENT_ID)
        setIsLiked(isLike)
        setLikeCount(likeLength)
      }
    }

    fetchLike()
  }, [userId])

  return (
    <div className={styles.commentContainer}>
      <Image src={profiles[profile_img]} alt="프로필 이미지" />
      <div className={styles.commentDetail}>
        <p className={styles.userInfo}>
          {user_name}
          <span>&nbsp;· {formatRelativeDate(created_at)}</span>
        </p>
        {isEditing && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <input
              className={styles.text}
              value={inputValue}
              onChange={handleChangeInputValue}
            />
            <button
              className={styles.save_btn}
              onClick={handleClickEditComment}
            >
              저장
            </button>
            <button
              className={styles.cancle_btn}
              onClick={() => setIsEditing(!isEditing)}
            >
              취소
            </button>
          </div>
        )}

        {!isEditing && <p className={styles.text}>{comment_content}</p>}

        <button onClick={() => handleClickCommentLike()}>
          <Image
            className={isLiked ? styles.likeOn : styles.likeOff}
            src={isLiked ? likeOn : likeOff}
            alt="좋아요"
          />

          <span>&nbsp;{likeCount}</span>
        </button>
      </div>
      <p
        className={
          isDotMenuVisible
            ? `${styles.moreBtn} ${styles.active}`
            : styles.moreBtn
        }
        onClick={handleClickDotMenu}
      >
        ⋮
      </p>
      {isDotMenuVisible && (
        <div className={styles.dotMenu}>
          <button onClick={() => handleClickEditButton()}>수정</button>
          <button onClick={() => handleClickDeleteComment()}>삭제</button>
        </div>
      )}
    </div>
  )
}
export default Comment
