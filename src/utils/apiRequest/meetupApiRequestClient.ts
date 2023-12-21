import { IMeetupBoardData } from '@/type/Component'
import { executeQuery, supabase } from './defaultApiSetting'

export const createMeetupBoard = async (data: IMeetupBoardData) => {
  return executeQuery(
    supabase.from('meetup_board').insert([data]),
    '데이터를 생성하지 못했습니다',
  )
}

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

export const updateMember = async (id: number, member_list: string[]) => {
  return executeQuery(
    supabase.from('meetup_board').update({ member_list }).eq('id', id),
    '멤버가 수정되지 않았습니다',
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
