'use server'

import React from 'react'
import youtubeRequest from '@/utils/youtubRequest/youtubeRequest'
import VideoList from './_components/VideoList'

const MeetupPage = async (): Promise<React.JSX.Element> => {
  const { itemList, pageToken } = await youtubeRequest({
    apiType: 'popular',
  })

  return <VideoList initialData={itemList} pageToken={pageToken} />
}

export default MeetupPage
