'use server'

import React from 'react'
import youtubeDataRequest from '@/utils/youtubRequest/youtubeApiRequest'
import { IYoutubeResponse } from '@/type/YoutubeApiResponse'

import VideoList from './_components/VideoList'

const MeetupPage = async (): Promise<React.JSX.Element> => {
  const { nextPageToken, items } = await youtubeDataRequest<IYoutubeResponse>({
    apiType: 'popular',
  })

  return <VideoList initialData={items} pageToken={nextPageToken} />
}

export default MeetupPage
