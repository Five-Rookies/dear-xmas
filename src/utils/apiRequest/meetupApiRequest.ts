import { IMeetupBoardData } from '@/app/(meetUp)/@createMeetupModal/(.)detail/[id]/meetupModal/_components/_meetupModal/MeetupModal'
import { executeQuery, supabase } from './defaultApiSetting'

export const createMeetupBoard = async (data: IMeetupBoardData) => {
  return executeQuery(
    supabase.from('meetup_board').insert([data]),
    '데이터를 생성하지 못했습니다',
  )
}

export const getMeetupList = async () => {
  return executeQuery(
    supabase.from('meetup_board').select('*'),
    '데이터 조회를 실패했습니다',
  )
}
