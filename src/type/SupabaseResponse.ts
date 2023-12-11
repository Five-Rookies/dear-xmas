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

export default interface ISurvey {
  first_baby: number,
  first_child: number,
  first_teenager: number,
  first_adult: number,
  first_stillTrust: number,

  second_pretend: number,
  second_pokerFace: number,
  second_honest: number,
  second_throwAway: number,
  second_sell: number,

  third_money: number,
  third_electronics: number,
  third_clothes: number,
  third_travelTicket: number,
  third_none: number,
}