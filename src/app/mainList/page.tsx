import VIDEO_LIST from '@public/videos/popular.json'
import { NextPage } from 'next'
import React from 'react'
import axios from 'axios'
import { IVideo, ISnippet } from '@/type/Api'
import VideoList from '@/app/mainList/VideoList'

type VideoListType = IVideo[]

const getVideoList = async (): Promise<VideoListType> => {
  const ACCESS_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  const URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=32&key=${ACCESS_KEY}`
  const response = await (await axios.get(URL)).data.items
  if (!response) {
    throw new Error('data is not defined')
  }
  return response
}

const VideoListPage: NextPage<ISnippet> = async () => {
  const videoList: VideoListType = await getVideoList()
  //const videoList: VideoListType = VIDEO_LIST.items
  return (
    <div className="inner-box">
      <VideoList videoList={videoList} />
    </div>
  )
}

export default VideoListPage
