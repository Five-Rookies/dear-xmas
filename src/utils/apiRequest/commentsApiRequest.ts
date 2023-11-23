import { createClient } from '@supabase/supabase-js'
import Comment from '@/type/SupabaseRespons'

const supabase = createClient<Comment[]>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SERVICE_KEY as string,
)

const commentsApiRequest = async () => {
  try {
    const { data, error } = await supabase.from('video_comment').select('*')
    if (error) throw new Error()
    return data
  } catch (err) {
    console.error('데이터를 불러오지 못했습니다', err)
    return null
  }
}
commentsApiRequest()

export default commentsApiRequest
