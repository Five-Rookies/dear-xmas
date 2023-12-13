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

const profiles = [santa, snowman, candle, cookie]
const randomProfile = Math.round(Math.random() * 3)

const CommentList = ({ getVideoId }: { getVideoId: string }) => {
  const [comments, setComments] = useState<IComment[]>([])

  const fetchComments = async () => {
    const totalComments = await getComments(getVideoId)
    if (totalComments) {
      setComments(totalComments)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div className={styles.comments}>
      <p>댓글 {comments.length}개</p>
      <div className={styles.inputComments}>
        <Image src={profiles[randomProfile]} alt="프로필 이미지" />
        <CreateComment profile={randomProfile} fetchComments={fetchComments} />
      </div>
      {comments.length !== 0 &&
        [...comments]
          .sort((a, b) => b.id - a.id)
          .map((el: IComment) => {
            return (
              <Comment
                key={el.id}
                comment={el}
                getVideoId={getVideoId}
                setComments={setComments}
                fetchComments={fetchComments}
              />
            )
          })}
    </div>
  )
}

export default CommentList
