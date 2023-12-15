import { supabase, executeQuery } from '@/utils/apiRequest/defaultApiSetting'
import ISupabase from '@/type/SupabaseResponse'
import ISurvey from '@/type/SupabaseResponse'


export const getSurveyResult = async (): Promise<ISurvey[]> => {
  return executeQuery(
    supabase.from('survey2').select('*'),
    '데이터를 불러오지 못했습니다',
  )
}




// export const insertSurveyValue = async () => {
// const { data, error } = await supabase
//   .from('survey')
//   .insert([
//     { firsty_baby: 3, first_adult: 4 },
//   ])
//   .select()
        
// }



// const { data, error } = await surveyReult
// if (error) throw error
// const surveyReult: ISurvey = data