import { Tables, TablesInsert } from './supabase'

export type TComments = Tables<'comments'>
export type TCommentLike = Tables<'comment_like'>
export type TProfiles = Tables<'profiles'>
export type TLiveChat = Tables<'live_chat'>
export type TMeetupBoard = TablesInsert<'meetup_board'>
export type TSurvey = Omit<Tables<'survey'>, 'id'>
