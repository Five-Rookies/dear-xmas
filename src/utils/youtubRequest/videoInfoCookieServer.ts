import { cookies } from 'next/headers'

// 서버 함수
export const getVideoInfoToCookie = () => {
  const cookieStore = cookies()
  const detailVideoInfo = cookieStore.get('detail-video-info')
  if (detailVideoInfo) {
    return JSON.parse(detailVideoInfo.value)
  }
  return null
}

export default { getVideoInfoToCookie }
