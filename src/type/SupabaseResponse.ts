export default interface ISupabase {
  id: number
  created_at: string
  user_name: string
  video_id: string
  profile_img: 1 | 2 | 3 | 4
  like_num?: number
  comment_content?: string
  live_content?: string
  user_id?: string
  user_name?: string
}
