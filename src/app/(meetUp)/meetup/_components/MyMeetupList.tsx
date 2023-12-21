'use client'

import React, { useState, useEffect } from 'react'
import { IMeetupBoardData } from '@/type/Component'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'
import MeetupBox from './MeetupBox'
import { getMeetupList } from '@/utils/apiRequest/meetupApiRequestClient'

const MyMeetupList = (): React.JSX.Element => {
  const [userName, setUserName] = useState<string>('')
  const [createdMeetup, setCreatedMeetup] = useState<never[]>([])

  const fetchUser = async (): Promise<void> => {
    const { data } = await supabase.auth.getSession()
    setUserName(data.session?.user.user_metadata.user_name)
  }

  const fetchMeetupList = async (): Promise<void> => {
    const res = await getMeetupList()
    setCreatedMeetup(res)
  }

  useEffect(() => {
    fetchUser()
    fetchMeetupList()
  }, [])

  return (
    <div>
      {createdMeetup
        ?.filter(
          (meetup: IMeetupBoardData) =>
            meetup?.user_name === userName ||
            meetup?.member_list?.includes(userName),
        )
        .map((meetup: IMeetupBoardData) => {
          return (
            <MeetupBox
              key={meetup.id}
              meetup={meetup}
              fetchMeetupList={fetchMeetupList}
            />
          )
        })}
    </div>
  )
}

export default MyMeetupList
