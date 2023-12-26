import { supabase, executeQuery } from './defaultServerApiSetting'

export const getMeetupList = async () => {
  return executeQuery(
    supabase.from('meetup_board').select('*').order('id', { ascending: false }),
    '데이터 조회를 실패했습니다',
  )
}
export const getPrevMember = async (id: number) => {
  return executeQuery(
    supabase.from('meetup_board').select('member_list').eq('id', id).single(),
    '기존멤버 조회를 실패했습니다',
  )
}

export const getTodayMeetup = async () => {
  return executeQuery(
    supabase
      .from('meetup_board')
      .select()
      .gte(
        'scheduling',
        `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`,
      )
      .lte(
        'scheduling',
        `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
          new Date().getDate() + 1
        }`,
      ),
    '오늘 라이브 데이터를 불러오지 못했습니다',
  )
}
