import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/type/supabase'

export const supabase = createClientComponentClient<Database>()

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
