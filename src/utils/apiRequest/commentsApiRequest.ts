import { createClient } from '@supabase/supabase-js'
import Comment from '@/type/SupabaseRespons'

const supabase = createClient<Comment[]>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SERVICE_KEY as string,
)

export const getComments = async () => {
  try {
    const { data, error } = await supabase.from('video_comment').select('*')
    if (error) throw new Error()
    return data
  } catch (err) {
    console.error('데이터를 불러오지 못했습니다', err)
    return null
  }
}

export const createComments = async (text: string, video_id: string) => {
  try {
    const { data, error } = await supabase.from('video_comment').insert([
      {
        text,
        video_id,
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

export const updateComments = async (text: string, video_id: string) => {
  try {
    const { data, error } = await supabase
      .from('video_comment')
      .update([{ text }])
      .eq('video_id', video_id)

    if (error) throw new Error()
    return data
  } catch (err) {
    console.error('데이터를 수정하지 못했습니다', err)
  }
}

export const deleteComments = async (video_id: string) => {
  try {
    const { data, error } = await supabase
      .from('video_comment')
      .delete()
      .eq('video_id', video_id)

    if (error) throw new Error()
    return data
  } catch (err) {
    console.error('데이터를 삭제하지 못했습니다', err)
  }
}
