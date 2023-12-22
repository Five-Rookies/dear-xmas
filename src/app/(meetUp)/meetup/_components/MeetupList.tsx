'use client'

import React, { useEffect, useState } from 'react'
import { getMeetupList } from '@/utils/apiRequest/meetupApiRequestClient'
import { IMeetupBoardData } from '@/type/Component'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'
import MeetupBox from './MeetupBox'
import TabLoading from '@/app/(meetUp)/meetup/_components/_tab/TabLoading'
//import likeIcon from '@public/assets/like.svg'

const MeetupList = (): React.JSX.Element => {
  const [isDotMenuVisible, setIsDotMenuVisible] = useState<boolean>(false)
  const [createdMeetup, setCreatedMeetup] = useState<IMeetupBoardData[]>([])
  const [userName, setUserName] = useState<string>('')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handleDotMenu = () => {
    setIsDotMenuVisible(!isDotMenuVisible)

    // dotMenu에 5초 이상 이벤트가 없으면 다시 닫힘
    if (!isDotMenuVisible) {
      setTimeout(() => {
        setIsDotMenuVisible(false)
      }, 10000)
    }
  }
  const handleEditButton = () => {
    setIsDotMenuVisible(!isDotMenuVisible)
    setIsEditing(true)
  }

  const handleDeleteButton = async () => {
    setIsDotMenuVisible(!isDotMenuVisible)
    // deleteComments(comment.id)
    // await renderUpdatedComment()
  }

  const fetchMeetupList = async () => {
    setIsLoading(true)
    const meetupList = await getMeetupList()
    setCreatedMeetup(meetupList)
    setIsLoading(false)
  }

  const fetchUser = async (): Promise<void> => {
    const { data } = await supabase.auth.getSession()
    setUserName(data.session?.user.user_metadata.user_name)
  }

  useEffect(() => {
    fetchMeetupList()
    fetchUser()
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
