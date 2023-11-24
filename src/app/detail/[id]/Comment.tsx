import React from 'react'
import Comments from '@/type/SupabaseRespons'
import Image from 'next/image'
import santa from '@public/assets/profile-santa.svg'
import snowman from '@public/assets/profile-snowman.svg'
import candle from '@public/assets/profile-candle.svg'
import cookie from '@public/assets/profile-cookie.svg'
import likeIcon from '@public/assets/like.svg'
import formatRelativeDate from '@/utils/relativeDate'
import styles from './detail.module.scss'

const Comment = ({ comment }: { comment: Comments }) => {
  const profiles = [santa, snowman, candle, cookie]
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
export default Comment
