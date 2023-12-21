'use server'

import React from 'react'
import MyMeetupList from '../_components/MyMeetupList'
//import { getMeetupList } from '@/utils/apiRequest/meetupApiRequestServer'
//import { IMeetupBoardData } from '@/type/Component'

const page = async (): Promise<React.JSX.Element> => {
  //const meetupListData: IMeetupBoardData[] = await getMeetupList()
  return <MyMeetupList /*meetupList={meetupListData}*/ />
}

export default page
