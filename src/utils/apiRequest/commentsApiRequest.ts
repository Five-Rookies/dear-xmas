/* eslint-disable camelcase */
import { createClient } from '@supabase/supabase-js'
import Comments from '@/type/SupabaseRespons'

const supabase = createClient<Comments[]>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SERVICE_KEY as string,
)

export const getComments = async (video_id: string) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('video_id', video_id)
    if (error) throw new Error()
    return data
  } catch (err) {
    console.error('데이터를 불러오지 못했습니다', err)
    return null
  }
}

export const getCommentsById = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw new Error()
    return data
  } catch (err) {
    console.error('해당 id의 데이터를 불러오지 못했습니다', err)
    return null
  }
}

export const createComments = async (
  text: string,
  video_id: string,
  user_name: string,
  img_path: number,
) => {
  try {
    const { data, error } = await supabase.from('comments').insert([
      {
        text,
        video_id,
        user_name,
        img_path,
      },
    ])

    if (error) {
      throw error
    }

    return data
  } catch (err) {
    console.error('데이터를 생성하지 못했습니다', err)
  }
}

export const updateComments = async (
  text: string,
  like_num: number,
  id: string,
) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .update([{ text, like_num }])
      .eq('id', id)

    if (error) throw new Error()
    return data
  } catch (err) {
    console.error('데이터를 수정하지 못했습니다', err)
  }
}

export const deleteComments = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)

    if (error) throw new Error()
    return data
  } catch (err) {
    console.error('데이터를 삭제하지 못했습니다', err)
  }
}
