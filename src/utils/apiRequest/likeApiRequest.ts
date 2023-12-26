import { executeQuery, supabase } from './defaultApiSetting'

export const getLike = async (
  userId: string,
  contentId: number,
  table: string,
): Promise<any> => {
  const { data, error } = await supabase
    .from(table)
    .select('is_like')
    .eq(`${table.slice(0, -5)}_id`, contentId)
  if (error) {
    console.error('Error fetching like status: ', error)
  }
  return (
    data?.filter((like: { is_like: string }) => like.is_like === userId)[0]
      ?.is_like === userId
  )
}
export const checkLike = async (
  userId: string | undefined,
  contentId: number,
  table: string,
): Promise<any> => {
  return executeQuery(
    supabase
      .from(table)
      .select('*')
      .eq('user_id', userId)
      .eq(`${table.slice(0, -5)}_id`, contentId),
    '좋아요를 불러오지 못했습니다',
  )
}

export const countLike = async (
  contentId: number,
  table: string,
): Promise<number | undefined> => {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq(`${table.slice(0, -5)}_id`, contentId)

  if (error) {
    console.error('Error counting likes: ', error)
  }

  return data?.length
}
export const createLike = async (
  user_id: string | undefined,
  contentId: number,
  table: string,
): Promise<any> => {
  return executeQuery(
    supabase
      .from(table)
      .insert([
        { user_id, [`${table.slice(0, -5)}_id`]: contentId, is_like: user_id },
      ]),
    '좋아요 등록 실패',
  )
}

export const removeLike = async (
  userId: string,
  contentId: number,
  table: string,
): Promise<void> => {
  executeQuery(
    supabase
      .from(table)
      .delete()
      .eq('user_id', userId)
      .eq(`${table.slice(0, -5)}_id`, contentId),
    '좋아요 삭제 실패',
  )
}
