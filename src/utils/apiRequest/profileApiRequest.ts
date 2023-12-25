/* eslint-disable camelcase */
import { TProfiles } from '@/type/SupabaseResponse'
import { supabase, executeQuery } from './defaultApiSetting'

const tableName = 'profiles'

export const getProfile = async (
  fieldName: string,
  fieldValue: string,
): Promise<TProfiles[]> => {
  return executeQuery(
    supabase.from(tableName).select('*').eq(fieldName, fieldValue),
    '유저정보를 불러오지 못했습니다',
  )
}

interface ISupabaseError {
  code: string
  detail: string | null
  hint: string | null
  message: string
}

export const updateProfile = async ({
  id,
  profile_img,
  user_name,
}: Pick<TProfiles, 'id' | 'profile_img' | 'user_name'>): Promise<any> => {
  try {
    const { error } = await supabase
      .from(tableName)
      .update({
        profile_img,
        user_name,
      })
      .eq('id', id)

    if (error) throw error
  } catch (error: any) {
    // error: unknow 타입으로 code 접근이 불가하여 타입 가드(type guard) 사용
    if ('code' in error) {
      const supabaseError = error as ISupabaseError
      if (supabaseError.code === '23505') throw new Error(`중복된 닉네임입니다`)
    }
    console.error(error)
    throw new Error(`[ERROR]데이터를 수정하지 못했습니다`)
  }
}

export const fetchSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

export const getProfileByEmail = async () => {
  const session = await fetchSession()
  const email = session?.user?.email
  const [userData]: TProfiles[] = await getProfile('email', email!)
  return userData
}
