import React from 'react'
import santa from '@public/assets/profile-santa.svg'
import snowman from '@public/assets/profile-snowman.svg'
import candle from '@public/assets/profile-candle.svg'
import cookie from '@public/assets/profile-cookie.svg'
import likeIcon from '@public/assets/like.svg'
import Image from 'next/image'
import formatRelativeDate from '@/utils/relativeDate'
import styles from './detail.module.scss'
import { createComments } from '@/utils/apiRequest/commentsApiRequest'

interface ICommentProp {
  id: number
  created_at: string
  user_name: string
  img_path: 1 | 2 | 3 | 4
  like_num: number
  text: string
  video_id: string
  anonymous_user_id: string
}
const profiles = [santa, snowman, candle, cookie]
const randomProfile = Math.round(Math.random() * 3)

// const handleCreate = async (e: Event) => {
//   console.log('????????', e)
//   // const res = await createComments(text,   videoId,
//   // '기본 사용자',
//   // randomProfile)
// }

const Comment = ({ comment }: { comment: ICommentProp }) => {
  // const handleLikeButton = e => {
  //   console.log('#########', e.target)
  // }
  return (
    <div className={styles.commentContainer}>
      <Image src={profiles[comment.img_path]} alt="프로필 이미지" />
      <div className={styles.commentDetail}>
        <p className={styles.userInfo}>
          {comment.user_name}
          <span>&nbsp;· {formatRelativeDate(comment.created_at)}</span>
        </p>
        <p className={styles.text}>{comment.text}</p>
        <button
        // onClick={() => {
        //   handleLikeButton
        // }}
        >
          <Image src={likeIcon} alt="좋아요" />
          <span>{comment.like_num}</span>
        </button>
      </div>
    </div>
  )
}

const Comments = ({ totalComments }: { totalComments: ICommentProp[] }) => {
  const data = totalComments
  return (
    <div className={styles.comments}>
      <p>댓글 {data.length}개</p>
      <div className={styles.inputComments}>
        <Image src={profiles[randomProfile]} alt="프로필 이미지" />
        <input type="text" placeholder="댓글을 남겨주세요" />
      </div>
      {data?.map((el: ICommentProp, idx: number) => {
        return <Comment key={idx} comment={el} />
      })}
    </div>
  )
}

export default Comments
