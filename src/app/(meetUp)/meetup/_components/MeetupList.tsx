'use client'

import React, { useEffect, useState } from 'react'

import btn from '@/app/globalButton.module.scss'
import { getMeetupList } from '@/utils/apiRequest/meetupApiRequest'
import { IMeetupBoardData } from '@/type/Component'

import { supabase } from '@/utils/apiRequest/defaultApiSetting'
import MeetupBox from './MeetupBox'
//import likeIcon from '@public/assets/like.svg'

const MeetupList = () => {
  const [isDotMenuVisible, setIsDotMenuVisible] = useState(false)
  const [createdMeetup, setCreatedMeetup] = useState([])
  const [userName, setUserName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
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
    const res = await getMeetupList()
    setCreatedMeetup(res)
  }

  const fetchUser = async () => {
    const { data } = await supabase.auth.getSession()
    setUserName(data.session?.user.user_metadata.user_name)
  }

  useEffect(() => {
    fetchMeetupList()
    fetchUser()
  }, [])

  return (
    <>
      {createdMeetup.map((meetup: IMeetupBoardData) => {
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
