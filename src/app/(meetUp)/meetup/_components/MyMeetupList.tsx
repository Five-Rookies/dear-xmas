'use client'

import React, { useState, useEffect } from 'react'
import { IMeetupBoardData } from '@/type/Component'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'
import MeetupBox from './MeetupBox'
import { getMeetupList } from '@/utils/apiRequest/meetupApiRequest'

const MyMeetupList = () => {
  const [userName, setUserName] = useState('')
  const [createdMeetup, setCreatedMeetup] = useState([])

  const fetchUser = async () => {
    const { data } = await supabase.auth.getSession()
    setUserName(data.session?.user.user_metadata.user_name)
  }

  const fetchMeetupList = async () => {
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
