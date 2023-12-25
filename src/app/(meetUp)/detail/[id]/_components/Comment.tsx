/* eslint-disable camelcase */

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
import { supabase } from '@/utils/apiRequest/defaultApiSetting'
import { Tables } from '@/type/supabase'
import styles from '../detail.module.scss'
import { getProfileByEmail } from '@/utils/apiRequest/profileApiRequest'
import { debounce } from 'lodash'

interface ICommentProps {
  comment: Tables<'comments'>
  fetchComments: () => Promise<void>
}

const Comment = ({ comment, fetchComments }: ICommentProps) => {
  const { id, user_id, user_name, comment_content, profile_img, created_at } =
    comment

  const COMMENT_ID: number = id
  const profiles: any[] = [santa, snowman, candle, cookie]
  const [isDotMenuVisible, setIsDotMenuVisible] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string | null>(comment_content)

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [userId, setUserId] = useState<string | undefined>('')
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number | undefined>(0)

  const getUserId = async (): Promise<void> => {
    const userData: Tables<'profiles'> = await getProfileByEmail()
    setUserId(userData?.id)
  }

  const handleClickCommentLike = debounce(async (): Promise<void> => {
    const checkIsLiked: Tables<'comment_like'>[] = await checkLike(
      userId,
      COMMENT_ID,
      'comment_like',
    )

    if (checkIsLiked.length <= 0) {
      await createLike(userId, COMMENT_ID, 'comment_like')
      setLikeCount(prevLikeCount =>
        prevLikeCount !== undefined ? prevLikeCount + 1 : undefined,
      )
    }

    if (checkIsLiked.length > 0) {
      await removeLike(userId!, COMMENT_ID, 'comment_like')
      setLikeCount(prevLikeCount =>
        prevLikeCount !== undefined ? prevLikeCount - 1 : undefined,
      )
    }
    setIsLiked(!isLiked)
  }, 500)

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
    const editValue: string | null = inputValue

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
        const isLike: boolean = await getLike(
          userId,
          COMMENT_ID,
          'comment_like',
        )
        const likeLength: number | undefined = await countLike(
          COMMENT_ID,
          'comment_like',
        )
        setIsLiked(isLike)
        setLikeCount(likeLength)
      }
    }

    fetchLike()
  }, [userId])

  return (
    <div className={styles.commentContainer}>
      <Image src={profiles[profile_img!]} alt="프로필 이미지" />
      <div className={styles.commentDetail}>
        <p className={styles.userInfo}>
          {user_name}
          <span>&nbsp;· {formatRelativeDate(created_at)}</span>
        </p>
        {isEditing && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <input
              className={styles.text}
              value={inputValue || undefined}
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
            width="0"
            height="0"
            className={isLiked ? styles.likeOn : styles.likeOff}
            src={isLiked ? likeOn : likeOff}
            style={{ width: 'auto', height: 'auto' }}
            alt="좋아요"
          />

          <span>&nbsp;{likeCount}</span>
        </button>
      </div>
      {userId === user_id && (
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
      )}

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
