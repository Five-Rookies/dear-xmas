import { Tables, TablesInsert } from './supabase'

export type TComments = Tables<'comments'>
export type TCommentLike = Tables<'comment_like'>
export type TProfiles = Tables<'profiles'>
export type TLiveChat = Tables<'live_chat'>
export type TMeetupBoard = TablesInsert<'meetup_board'>

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
