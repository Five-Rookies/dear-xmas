import { executeQuery, supabase } from './defaultApiSetting'

// 실시간 영상
export const getLive = async (meetup_id: string) => {
  return executeQuery(
    supabase.from('meetup_board').select('*').eq('id', meetup_id).single(),
    '라이브 영상 불러오기 실패!',
  )
}

export const deleteLive = async (meetup_id: string) => {
  console.log(meetup_id)
  return executeQuery(
    supabase.from('meetup_board').delete().eq('id', meetup_id),
    '모임을 삭제하지 못했습니다',
  )
}

// 실시간 채팅
export const getChat = async (meetup_id: string) => {
  return executeQuery(
    supabase.from('live_chat').select('*').eq('meetup_id', meetup_id),
    '채팅 목록 불러오기 실패!',
  )
}

export const createChat = async (
  meetup_id: string,
  user_name: string,
  user_id: string,
  profile_img: number,
  live_content: string,
) => {
  return executeQuery(
    supabase.from('live_chat').insert([
      {
        meetup_id,
        user_name,
        user_id,
        profile_img,
        live_content,
      },
    ]),
    '데이터를 생성하지 못했습니다',
  )
}
