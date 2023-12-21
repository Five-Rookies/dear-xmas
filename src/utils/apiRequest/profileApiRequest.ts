import { supabase, executeQuery } from './defaultApiSetting'

export interface IProfile {
  email: string
  id: string
  password_hint: string
  profile_img: 0 | 1 | 2 | 3
  user_name: string
}

export const getProfile = async (
  fieldName: string,
  fieldValue: string,
): Promise<IProfile[]> => {
  return executeQuery(
    supabase.from('profiles').select('*').eq(fieldName, fieldValue),
    '유저정보를 불러오지 못했습니다',
  )
}
