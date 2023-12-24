'use client'

import React, { useEffect, useState } from 'react'
import { getMeetupList } from '@/utils/apiRequest/meetupApiRequestClient'
import { IMeetupBoardData } from '@/type/Component'
import MeetupBox from './MeetupBox'
import TabLoading from '@/app/(meetUp)/meetup/_components/_tab/TabLoading'

const MeetupList = (): React.JSX.Element => {
  const [createdMeetup, setCreatedMeetup] = useState<IMeetupBoardData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchMeetupList = async () => {
    setIsLoading(true)
    const meetupList = await getMeetupList()
    setCreatedMeetup(meetupList)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchMeetupList()
  }, [])

  return (
    <>
      {isLoading && <TabLoading />}
      {!isLoading &&
        createdMeetup.map((meetup: IMeetupBoardData) => {
          return (
            <MeetupBox
              key={meetup.id}
              meetup={meetup}
              fetchMeetupList={fetchMeetupList}
            />
          )
        })}
    </>
  )
}

export default MeetupList
