import { NextPage } from 'next'
import React from 'react'
import { IVideo, ISnippet } from '@/type/Api'
import VideoList from '@/components/home/VideoList'
import youtubeApiRequest from '@/utils/apiRequest/youtubeApiRequest'
import testJSON from '@public/videos/popular.json'
import styles from './page.module.scss'

type VideoListType = IVideo[]

const getVideoList = async (): Promise<VideoListType> => {
  // const response = await youtubeApiRequest()
  // return response
  return testJSON.items
  /* const ACCESS_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
	const URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=32&key=${ACCESS_KEY}`
	const response = await (await axios.get(URL)).data.items
	if (!response) {
		throw new Error('data is not defined')
	}
	return response */
}

const Home = async () => {
  const videoList: VideoListType = await getVideoList()
  // const videoList: VideoListType = VIDEO_LIST.items

  return (
    <main className="main-container">
      <section className={styles.bg}>
        <ul className={styles.tree}>
          <li>
            <img src="/assets/tree.png" alt="" />
          </li>
          <li>
            <img src="/assets/tree.png" alt="" />
          </li>
          <li>
            <img src="/assets/tree.png" alt="" />
          </li>
          <li>
            <img src="/assets/tree.png" alt="" />
          </li>
        </ul>
        <div className={styles.snowBg}></div>
        <img className={styles.santa} src="/assets/santa.png" alt="" />
      </section>

      <div className="innerBox"></div>
      <section className="inner-box">
        <VideoList videoList={videoList} />
      </section>
    </main>
  )
}

export default Home
