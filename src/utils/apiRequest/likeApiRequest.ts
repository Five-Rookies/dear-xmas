import { executeQuery, supabase } from './defaultApiSetting'

export const getLike = async (
  userId: string | undefined,
  commentId: number,
): Promise<any> => {
  const { data, error } = await supabase
    .from('comment_like')
    .select('is_like')
    .eq('user_id', userId)
    .eq('comment_id', commentId)

  if (error) {
    console.error('Error fetching like status: ', error)
  }

  return data?.[0]?.is_like
}

export const countLike = async (
  commentId: number,
): Promise<number | undefined> => {
  const { data, error } = await supabase
    .from('comment_like')
    .select('*')
    .eq('comment_id', commentId)
    .eq('is_like', true)

  if (error) {
    console.error('Error counting likes: ', error)
  }

  return data?.length
}

export const checkLike = async (
  userId: string | undefined,
  commentId: number,
): Promise<any> => {
  return executeQuery(
    supabase
      .from('comment_like')
      .select('*')
      .eq('user_id', userId)
      .eq('comment_id', commentId),
    '좋아요를 불러오지 못했습니다',
  )
}

export const createLike = async (
  userId: string | undefined,
  commentId: number,
  isLiked: boolean,
): Promise<any> => {
  return executeQuery(
    supabase
      .from('comment_like')
      .insert([{ user_id: userId, comment_id: commentId, is_like: isLiked }]),
    '좋아요 등록 실패',
  )
}

export const removeLike = async (commentId: number): Promise<void> => {
  executeQuery(
    supabase.from('comment_like').delete().eq('comment_id', commentId),
    '좋아요 삭제 실패',
  )
}
