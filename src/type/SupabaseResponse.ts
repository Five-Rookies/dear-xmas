import { Tables } from './supabase'

export type TComments = Tables<'comments'>
export type TCommentLike = Tables<'comment_like'>
export type TProfile = Tables<'profiles'>
export type TLiveChat = Tables<'live_chat'>

export interface ISupabase {
  id: number
  created_at: string
  video_id: string
  profile_img: 1 | 2 | 3 | 4
  like_num?: number
  comment_content?: string
  live_content?: string
  user_id?: string
  user_name?: string
}

export interface ISurvey {
  first_baby: number
  first_child: number
  first_teenager: number
  first_adult: number
  first_stillTrust: number

  second_pretend: number
  second_pokerFace: number
  second_honest: number
  second_throwAway: number
  second_sell: number

  third_money: number
  third_electronics: number
  third_clothes: number
  third_travelTicket: number
  third_none: number
}
