import { createClient } from '@supabase/supabase-js'
import ISupabase from '@/type/SupabaseResponse'

export const supabase = createClient<ISupabase[]>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
)

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
