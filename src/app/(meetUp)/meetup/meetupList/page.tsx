'use server'

import React from 'react'
import MeetupList from '../_components/MeetupList'
//import { getMeetupList } from '@/utils/apiRequest/meetupApiRequestServer'
//import { IMeetupBoardData } from '@/type/Component'

const page = async (): Promise<React.JSX.Element> => {
  //const meetupListData: IMeetupBoardData[] = await getMeetupList()

  return <MeetupList /*meetupList={meetupListData}*/ />
}

export default page
