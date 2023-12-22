/* eslint-disable camelcase */
import { Tables } from '@/type/supabase'
import { supabase, executeQuery } from './defaultApiSetting'

const tableName = 'profiles'

type TProfiles = Tables<'profiles'>

export const getProfile = async (
  fieldName: string,
  fieldValue: string,
): Promise<TProfiles[]> => {
  return executeQuery(
    supabase.from(tableName).select('*').eq(fieldName, fieldValue),
    '유저정보를 불러오지 못했습니다',
  )
}

export const updateProfile = async ({
  id,
  profile_img,
  user_name,
}: Pick<TProfiles, 'id' | 'profile_img' | 'user_name'>): Promise<any> => {
  return executeQuery(
    supabase
      .from(tableName)
      .update({
        profile_img,
        user_name,
      })
      .eq('id', id),
    '데이터를 수정하지 못했습니다',
  )
}
