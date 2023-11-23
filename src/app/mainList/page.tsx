import { NextPage } from 'next'
import React from 'react'
import { IVideo, ISnippet } from '@/type/Api'
import VideoList from '@/app/mainList/VideoList'
import youtubeApiRequest from '@/utils/apiRequest/youtubeApiRequest'

type VideoListType = IVideo[]

const getVideoList = async (): Promise<VideoListType> => {
  const response = await youtubeApiRequest()
  return response
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
