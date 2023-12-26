/* eslint-disable camelcase */
import { executeQuery, supabase } from './defaultApiSetting'

const tableName =
  process.env.NEXT_PUBLIC_IS_DEV_MODE === 'true' ? 'comments' : 'comments_PROD'

export const getComments = async (video_id: string): Promise<any> => {
  return executeQuery(
    supabase
      .from(tableName)
      .select('*')
      .eq('video_id', video_id)
      .order('id', { ascending: false }),
    '데이터를 불러오지 못했습니다',
  )
}

export const getCommentsById = async (id: number): Promise<any> => {
  return executeQuery(
    supabase.from(tableName).select('*').eq('id', id).single(),
    '해당 id의 데이터를 불러오지 못했습니다',
  )
}

export const createComments = async (
  comment_content: string,
  video_id: string,
  user_name: string | undefined,
  profile_img: number,
): Promise<any> => {
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
  comment_content: string | null,
  id: number,
): Promise<any> => {
  return executeQuery(
    supabase.from(tableName).update([{ comment_content }]).eq('id', id),
    '데이터를 수정하지 못했습니다',
  )
}

export const deleteComments = async (id: number): Promise<any> => {
  return executeQuery(
    supabase.from(tableName).delete().eq('id', id),
    '데이터를 삭제하지 못했습니다',
  )
}
