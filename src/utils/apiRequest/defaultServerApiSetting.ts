import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/type/supabase'
import { cookies } from 'next/headers'

export const supabase = createServerComponentClient<Database>({ cookies })

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
