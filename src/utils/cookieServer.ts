// 서버 함수
import { cookies } from 'next/headers'

export interface IVideoInfoToCookie {
  channelTitle: string
  videoId: string
  channelId: string
  title: string
  thumbnailsUrl: string
}

export const getVideoInfoToCookie = (): IVideoInfoToCookie | null => {
  const cookieStore = cookies()
  const detailVideoInfo = cookieStore.get('detail-video-info')
  if (detailVideoInfo) {
    return JSON.parse(detailVideoInfo.value)
  }
  return null
}

export default { getVideoInfoToCookie }
