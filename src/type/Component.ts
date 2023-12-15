export interface IDeveloper {
  name: string
  img: string
  intro: string
  github: string
  email: string
}

type ValuePiece = Date | null | string
type Value = ValuePiece | [ValuePiece, ValuePiece]

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
