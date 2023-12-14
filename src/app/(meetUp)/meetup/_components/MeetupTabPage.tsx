'use client'
import React, { useState } from 'react'
import MeetupTabButtons from './MeetupTabButtons'
import VideoList from './VideoList'
import MeetupList from './MeetupList'
import MyMeetupList from './MyMeetupList'

const MeetupTabPage = () => {
  const [activeTab, setActiveTab] = useState<string>('videoList')

  const handleClickTabButton = (tabName: string): void => {
    setActiveTab(tabName)
  }

  return (
    <div>
      <MeetupTabButtons
        activeTab={activeTab}
        handleClickTabButton={handleClickTabButton}
      />
      {activeTab === 'videoList' && <VideoList />}
      {activeTab === 'meetupList' && <MeetupList />}
      {activeTab === 'myMeetupList' && <MyMeetupList />}
    </div>
  )
}

export default MeetupTabPage
