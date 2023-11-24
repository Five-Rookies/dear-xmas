import React from 'react'
import santa from '@public/assets/profile-santa.svg'
import snowman from '@public/assets/profile-snowman.svg'
import candle from '@public/assets/profile-candle.svg'
import cookie from '@public/assets/profile-cookie.svg'
import Image from 'next/image'
import styles from './detail.module.scss'
import CreateComment from './CreateComment'
import Comment from './Comment'

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

const CommentList = ({ totalComments }: { totalComments: ICommentProp[] }) => {
  const data = totalComments
  return (
    <div className={styles.comments}>
      <p>댓글 {data.length}개</p>
      <div className={styles.inputComments}>
        <Image src={profiles[randomProfile]} alt="프로필 이미지" />
        <CreateComment />
      </div>
      {data?.map((el: ICommentProp, idx: number) => {
        return <Comment key={idx} comment={el} />
      })}
    </div>
  )
}

export default CommentList
