import axios from 'axios'

// 리렌더링시 오류메세지 지속적으로 표시되는 문제를 줄이기 위한 전역변수
let isErrorMessageShown = false

const youtubeApiRequest = async (
  optionalQuery: string = '&q=크리스마스|크리스마스영화',
  maxResults: number = 32,
) => {
  const ACCESS_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  const baseURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet`
  const commonQuery = `&regionCode=kr&type=video&order=relevance&videoSyndicated=true&maxResults=${maxResults}`
  const URL = `${baseURL}${commonQuery}${optionalQuery}&key=${ACCESS_KEY}`

  try {
    const youtubeApiData = await axios.get(URL)
    return youtubeApiData.data
  } catch (error) {
    console.log('[NOTICE] Youtube API 데이터 요청에 실패했습니다.')
    isErrorMessageShown = true
    // if (error instanceof Error) {
    //   console.error(error.message)
    // }
    throw error
  }
}

const youtubeJsonRequest = async (
  apiType: string = 'popular',
  optionalQuery: string = '',
) => {
  let jsonData
  if (apiType === 'popular' || apiType === 'search') {
    jsonData = await import('@public/videos/christmas/christmasPopular_v1.json')
  } else {
    const channelId = optionalQuery.split('=')[1]
    jsonData = await import(
      `@public/videos/christmas/searchByChannels/search-by-channel-id-${channelId}.json`
    )
  }

  return jsonData.default
}

const youtubeDataRequest = async (
  apiType: string = 'popular',
  optionalQuery: string = '&q=크리스마스|크리스마스영화',
  maxResults: number = 32,
) => {
  let youtubeData
  try {
    youtubeData = await youtubeApiRequest(optionalQuery, maxResults)
  } catch (error) {
    console.log('[NOTICE] API 요청 횟수 초과. JSON 데이터로 대체합니다.')
    youtubeData = await youtubeJsonRequest(apiType, optionalQuery)
  }

  return youtubeData
}

export default youtubeDataRequest
