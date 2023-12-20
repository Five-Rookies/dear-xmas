export interface IDeveloper {
  name: string
  img: string
  intro: string
  github: string
  email: string
}

export type ValuePiece = Date | null | string
export type Value = ValuePiece | [ValuePiece, ValuePiece]

export interface IMeetupBoardData {
  id?: number
  meetup_id?: number
  category?: string
  meetup_title?: string
  meetup_content?: string
  scheduling: Value
  user_name?: string | undefined
  video_id?: string
  thumbnail?: string
  created_at?: string
  meetup_like_num?: number
  member_list?: string[]
}
export interface ILike {
  comment_id?: number
  meetup_id?: number
  created_at?: string
  id: number
  is_like: boolean
  user_id: string
}
