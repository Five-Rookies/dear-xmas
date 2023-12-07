/* eslint-disable camelcase */
import { createClient } from '@supabase/supabase-js'
import ISupabase from '@/type/SupabaseResponse'

const tableName =
  process.env.NEXT_PUBLIC_IS_DEV_MODE === 'true' ? 'comments' : 'comments_PROD'

export const supabase = createClient<ISupabase[]>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SERVICE_KEY as string,
)

const executeQuery = async (queryBuilder: any, errorMessage: string) => {
  try {
    const { data, error } = await queryBuilder
    if (error) throw new Error(`[ERROR]${errorMessage}`)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// 실시간 채팅
export const GetChat = async (video_id: string) => {
  return executeQuery(
    supabase.from('live').select('*').eq('video_id', video_id),
    '라이브 채팅목록 불러오기 실패!',
  )
}

export const createChat = async (
  video_id: string,
  user_name: string,
  user_id: string,
  profile_img: number,
  live_content: string,
) => {
  return executeQuery(
    supabase.from('live').insert([
      {
        video_id,
        user_name,
        user_id,
        profile_img,
        live_content,
      },
    ]),
    '데이터를 생성하지 못했습니다',
  )
}

// 댓글
export const getComments = async (video_id: string) => {
  return executeQuery(
    supabase.from(tableName).select('*').eq('video_id', video_id),
    '데이터를 불러오지 못했습니다',
  )
}

export const getCommentsById = async (id: number) => {
  return executeQuery(
    supabase.from(tableName).select('*').eq('id', id).single(),
    '해당 id의 데이터를 불러오지 못했습니다',
  )
}

export const createComments = async (
  comment_content: string,
  video_id: string,
  user_name: string,
  profile_img: number,
) => {
  return executeQuery(
    supabase.from(tableName).insert([
      {
        comment_content,
        video_id,
        user_name,
        profile_img,
      },
    ]),
    '데이터를 생성하지 못했습니다',
  )
}

export const updateComments = async (
  text: string,
  like_num: number,
  id: number,
) => {
  return executeQuery(
    supabase.from(tableName).update([{ text, like_num }]).eq('id', id),
    '데이터를 수정하지 못했습니다',
  )
}

export const deleteComments = async (id: number) => {
  return executeQuery(
    supabase.from(tableName).delete().eq('id', id),
    '데이터를 삭제하지 못했습니다',
  )
}
