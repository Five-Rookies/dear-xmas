import { createClient } from '@supabase/supabase-js'
import { executeQuery } from '@/utils/apiRequest/defaultApiSetting'
import {  ISupabase, ISurvey  } from '@/type/SupabaseResponse'

const supabase = createClient<ISupabase[]>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
)

export const getSurveyData = async (): Promise<ISurvey[]> => {
  return executeQuery(
    supabase.from('survey').select('*'),
    '데이터를 불러오지 못했습니다',
  )
}


/**
 * 데이터 베이스 설문 통계 계산하는 함수
 * 사용법
 * const data = await surveyAnalysis()
 * console.log(data)
 * {
 * first_baby: 9,
 * first_child: 13,
 * first_teenager: 3,
 * first_adult: 1,
 * first_stilltrust: 6,
 * second_pretend: 22,
 * second_pokerface: 5,
 * second_honest: 2,
 * second_throwaway: 1,
 * second_sell: 2,
 * third_money: 13,
 * third_electronics: 10,
 * third_clothes: 3,
 * third_travelticket: 4,
 * third_none: 2
 * }
 */
export const surveyAnalysis = async () => {
  const data = await executeQuery(
    supabase.from('survey').select('*'),
    '데이터를 불러오는데 실패했습니다.',
  )

  const surveyResult = data.reduce(
    (acc: { [key: string]: number }, entry: { [key: string]: number }) => {
      for (const key in entry) {
        if (key !== 'id') acc[key] = (acc[key] || 0) + entry[key]
      }
      return acc
    },
    {},
  )

  return surveyResult
}


// firstAnswer, secondAnswer, thirdAnswer에는 선택된 survey key 값 입력하면 됩니다
export const updateServeyData = async (
  id: string,
  firstAnswer: string,
  secondAnswer: string,
  thirdAnswer: string,
) => {
  return executeQuery(
    supabase.from('survey').insert([
      {
        id,
        [firstAnswer]: 1,
        [secondAnswer]: 1,
        [thirdAnswer]: 1,
      },
    ]),
    '데이터를 불러오지 못했습니다',
  )
}

// export const sumSurveyData = async (): Promise<ISurvey[]> => {
//   return executeQuery(
//     supabase.from('survey').select('id, sum(👶0~5세)'),
//     '데이터를 불러오지 못했습니다'
//   )
// }

// export const updateSurveyData = async (
//   first_question: object,
//   second_question: object,
//   third_question: object
// ): Promise<ISurvey[]> => {
//   return executeQuery(
//     supabase.from('surey2').update([{first_question, second_question, third_question}]),
//     '데이터를 불러오지 못했습니다'
//   )
// }



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