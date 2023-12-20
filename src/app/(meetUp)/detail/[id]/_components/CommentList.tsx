'use client'

import React, { useState, useEffect } from 'react'
import santa from '@public/assets/profile-santa.svg'
import snowman from '@public/assets/profile-snowman.svg'
import candle from '@public/assets/profile-candle.svg'
import cookie from '@public/assets/profile-cookie.svg'
import Image from 'next/image'
import { getComments } from '@/utils/apiRequest/commentsApiRequest'
import IComment from '@/type/SupabaseResponse'
import styles from '../detail.module.scss'
import CreateComment from './CreateComment'
import Comment from './Comment'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'
const profiles = [santa, snowman, candle, cookie]

const CommentList = ({ getVideoId }: { getVideoId: string }) => {
  const [comments, setComments] = useState<IComment[]>([])
  const [userProfile, setUserProfile] = useState<number>(0)

  const fetchComments = async (): Promise<void> => {
    const totalComments: IComment[] = await getComments(getVideoId)
    if (totalComments) {
      setComments(totalComments)
    }
  }
  const getUserName = async (): Promise<void> => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUserProfile(user?.user_metadata.profile_img)
  }
  useEffect(() => {
    getUserName()
    fetchComments()
  }, [])

  return (
    <div className={styles.comments}>
      <p>댓글 {comments.length}개</p>
      <div className={styles.inputComments}>
        <Image src={profiles[userProfile]} alt="프로필 이미지" />
        <CreateComment profile={userProfile} fetchComments={fetchComments} />
      </div>
      {comments.length !== 0 &&
        comments.map((el: IComment) => {
          return (
            <Comment key={el.id} comment={el} fetchComments={fetchComments} />
          )
        })}
    </div>
  )
}

export default CommentList
