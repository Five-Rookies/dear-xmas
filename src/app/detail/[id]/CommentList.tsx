'use client'

import React, { useState, useEffect } from 'react'
import santa from '@public/assets/profile-santa.svg'
import snowman from '@public/assets/profile-snowman.svg'
import candle from '@public/assets/profile-candle.svg'
import cookie from '@public/assets/profile-cookie.svg'
import Image from 'next/image'
import { getComments } from '@/utils/apiRequest/commentsApiRequest'
import IComment from '@/type/SupabaseRespons'
import styles from './detail.module.scss'
import CreateComment from './CreateComment'
import Comment from './Comment'

const profiles = [santa, snowman, candle, cookie]
const randomProfile = Math.round(Math.random() * 3)

// const handleCreate = async (e: Event) => {
//   console.log('????????', e)
//   // const res = await createComments(text,   videoId,
//   // '기본 사용자',
//   // randomProfile)
// }

const CommentList = ({ getVideoId }: { getVideoId: string }) => {
  const [comments, setComments] = useState<IComment[]>([])

  useEffect(() => {
    const fetchComments = async () => {
      const totalComments = await getComments(getVideoId)
      if (totalComments) {
        setComments(totalComments)
      }
    }

    fetchComments()
  }, [getVideoId])

  if (comments.length === 0) return null

  return (
    <div className={styles.comments}>
      <p>댓글 {comments.length}개</p>
      <div className={styles.inputComments}>
        <Image src={profiles[randomProfile]} alt="프로필 이미지" />
        <CreateComment />
      </div>
      {comments?.map((el: IComment, idx: number) => {
        return (
          <Comment
            key={idx}
            comment={el}
            getVideoId={getVideoId}
            setComments={setComments}
          />
        )
      })}
    </div>
  )
}

export default CommentList
