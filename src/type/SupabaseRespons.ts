interface IComment {
  id: number
  created_at: string
  user_name: string
  img_path: 1 | 2 | 3 | 4
  like_num: number
  text: string
  video_id: string
  anonymous_user_id: string
}

export default IComment
