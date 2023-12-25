import { createClient } from '@supabase/supabase-js'
import { executeQuery } from '@/utils/apiRequest/defaultApiSetting'
import { ISurvey } from '@/type/SupabaseResponse'
import { Database } from '@/type/supabase'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
)

export const getSurveyData = async (): Promise<ISurvey[]> => {
  return executeQuery(
    supabase.from('survey').select('*'),
    '데이터를 불러오지 못했습니다',
  )
}

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
