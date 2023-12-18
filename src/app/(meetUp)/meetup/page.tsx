'use server'

import React from 'react'
import youtubeDataRequest from '@/utils/youtubApiRequest/youtubeApiRequest'
import { IYoutubeResponse } from '@/type/YoutubeApiResponse'

import VideoList from './_components/VideoList'

const MeetupPage = async (): Promise<React.JSX.Element> => {
  const videoList = await youtubeDataRequest<IYoutubeResponse>({
    apiType: 'popular',
  })

  return <VideoList initialVideoList={videoList.items} />
}

export default MeetupPage
