'use server'

import React from 'react'
import youtubeApiRequest from '@/utils/youtubRequest/youtubeApiRequest'
import youtubeJsonRequest from '@/utils/youtubRequest/youtubeJsonRequest'
import { IYoutubeItem } from '@/type/YoutubeApiResponse'
import VideoList from './_components/VideoList'

const MeetupPage = async (): Promise<React.JSX.Element> => {
  let totalItems: IYoutubeItem[] = []
  let pageToken: string = ''

  try {
    const { nextPageToken, items } = await youtubeApiRequest()
    totalItems = items
    pageToken = nextPageToken
  } catch {
    const { items } = await youtubeJsonRequest({
      apiType: 'search',
    })
    totalItems = items
  }

  return <VideoList initialData={totalItems} pageToken={pageToken} />
}

export default MeetupPage
