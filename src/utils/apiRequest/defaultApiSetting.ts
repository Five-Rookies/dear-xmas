import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ISupabase from '@/type/SupabaseResponse'

export const supabase = createClientComponentClient()

export const executeQuery = async (queryBuilder: any, errorMessage: string) => {
  try {
    const { data, error } = await queryBuilder
    if (error) throw error
    return data
  } catch (error) {
    console.error(error)
    throw new Error(`[ERROR]${errorMessage}`)
  }
}