import { createClient } from '@supabase/supabase-js'
import { executeQuery } from '@/utils/apiRequest/defaultApiSetting'
import ISupabase from '@/type/SupabaseResponse'
import ISurvey from '@/type/SupabaseResponse'
const supabase = createClient<ISupabase[]>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
)


// export const getSurveyData = async (): Promise<ISurvey[]> => {
//   try {
//     const { data, error } = await supabase
//       .from('survey2')
//       .select('*')
//     if (error) throw error
//     return data
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }

export const getSurveyData = async (): Promise<ISurvey[]> => {
  return executeQuery(
    supabase.from('survey2').select('*'),
    '데이터를 불러오지 못했습니다',
  )
}

export const updateSurveyData = async (
  first_question: object,
  second_question: object,
  third_question: object,
  id: number
): Promise<ISurvey[]> => {
  return executeQuery(
    supabase.from('surey2').update([{first_question, second_question, third_question}]).eq('id', id),
    '데이터를 불러오지 못했습니다'
  )
}



// import { supabase, executeQuery } from '@/utils/apiRequest/defaultApiSetting'
// import ISupabase from '@/type/SupabaseResponse'
// import ISurvey from '@/type/SupabaseResponse'


// export const getSurveyData = async (): Promise<ISurvey[]> => {
//   return executeQuery(
//     supabase.from('survey2').select('*'),
//     '데이터를 불러오지 못했습니다',
//   )
// }








// // const { data, error } = await surveyReult
// // if (error) throw error
// // const surveyReult: ISurvey = data