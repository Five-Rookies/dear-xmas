/* eslint-disable camelcase */
import { supabase, executeQuery } from './defaultApiSetting'

const tableName = 'profiles'

export interface IProfile {
  email: string
  id: string
  profile_img: 0 | 1 | 2 | 3
  user_name: string
  password_hint: string
}

export const getProfile = async (
  fieldName: string,
  fieldValue: string,
): Promise<IProfile[]> => {
  return executeQuery(
    supabase.from(tableName).select('*').eq(fieldName, fieldValue),
    '유저정보를 불러오지 못했습니다',
  )
}

interface IUpdateProfile {
  id: string
  profileImg: number
  userName: string
}

export const updateProfile = async ({
  id,
  profileImg,
  userName,
}: IUpdateProfile): Promise<any> => {
  return executeQuery(
    supabase
      .from(tableName)
      .update({
        profile_img: profileImg,
        user_name: userName,
      })
      .eq('id', id),
    '데이터를 수정하지 못했습니다',
  )
}
