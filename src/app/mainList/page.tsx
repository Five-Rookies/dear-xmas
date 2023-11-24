import { NextPage } from 'next'
import React from 'react'
import { IVideo, ISnippet } from '@/type/Api'
import VideoList from '@/app/mainList/VideoList'
import youtubeApiRequest from '@/utils/apiRequest/youtubeApiRequest'
import testJSON from '@public/videos/popular.json'

type VideoListType = IVideo[]

const getVideoList = async (): Promise<VideoListType> => {
  // const response = await youtubeApiRequest()
  // return response
  return testJSON.items
}

const VideoListPage: NextPage<ISnippet> = async () => {
  const videoList: VideoListType = await getVideoList()

  return (
    <div className="inner-box">
      <VideoList videoList={videoList} />
    </div>
  )
}

export default VideoListPage
