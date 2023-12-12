import { createClient } from '@supabase/supabase-js'
import ISupabase from '@/type/SupabaseResponse'
import ISurvey from '@/type/SupabaseResponse'

const supabase = createClient<ISupabase[]>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
)

export const getSurveyResult = async (first_question): Promise<ISurvey[]> => {
  try {
    const { data, error } = await supabase
      .from('survey2')
      .select('*')
      .eq('first_question', first_question)
    if (error) throw error
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}



// export const insertSurveyValue = async () => {
// const { data, error } = await supabase
//   .from('survey')
//   .eq('first_question', first_question)
//   .insert({"bar": "baz", "active": false, "balance": 7.77})
//   .select()
        
// }



// const { data, error } = await surveyReult
// if (error) throw error
// const surveyReult: ISurvey = data