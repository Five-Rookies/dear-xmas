import axios, { AxiosResponse } from 'axios'

const printErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message)
  }
}

const youtubeApiRequest = async <T>(
  optionalQuery: string = '&q=크리스마스|크리스마스영화',
  maxResults: number = 32,
): Promise<AxiosResponse<T>> => {
  const KEY = process.env.YOUTUBE_API_KEY
  const URL = process.env.YOUTUBE_API_URL
  const commonQuery = `&regionCode=kr&type=video&order=relevance&videoSyndicated=true&maxResults=${maxResults}`
  const requestUrl = `${URL}${commonQuery}${optionalQuery}&key=${KEY}`

  try {
    const youtubeApiData = await axios.get(requestUrl)
    return youtubeApiData.data
  } catch (error) {
    printErrorMessage(error)
    throw new Error('[ERROR] Youtube API 요청 불가. JSON 데이터로 대체합니다.')
  }
}

const youtubeJsonRequest = async <T>(
  apiType: string = 'popular',
  optionalQuery: string = '',
): Promise<T> => {
  try {
    let jsonData
    if (apiType === 'popular' || apiType === 'search') {
      jsonData = await import(
        '@public/videos/christmas/christmasPopular_v1.json'
      )
    } else {
      const channelId = optionalQuery.split('=')[1]
      jsonData = await import(
        `@public/videos/christmas/searchByChannels/search-by-channel-id-${channelId}.json`
      )
    }

    return jsonData.default
  } catch (error) {
    printErrorMessage(error)
    throw new Error('[ERROR] 유효하지 않은 JSON 데이터 요청입니다.')
  }
}

const youtubeDataRequest = async <T>(
  apiType: string = 'popular',
  optionalQuery: string = '&q=크리스마스|크리스마스영화',
  maxResults: number = 32,
): Promise<T> => {
  let youtubeData
  try {
    youtubeData = await youtubeApiRequest<T>(optionalQuery, maxResults)
  } catch (error) {
    printErrorMessage(error)
    youtubeData = await youtubeJsonRequest<T>(apiType, optionalQuery)
  }

  return youtubeData as T
}

export default youtubeDataRequest
