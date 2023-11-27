import axios from 'axios'

// https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30
// &q=%ED%81%AC%EB%A6%AC%EC%8A%A4%EB%A7%88%EC%8A%A4|%ED%81%AC%EB%A6%AC%EC%8A%A4%EB%A7%88%EC%8A%A4%EC%98%81%ED%99%94&type=video&regionCode=kr&order=rating&videoSyndicated=true&key=AIzaSyDyz5t2oRhfpHEnSrXL3LgZyWrJcvNy86Y

const youtubeApiRequest = async (
  optionalQuery: string = '&q=크리스마스|크리스마스영화',
  maxResults: number = 32,
) => {
  const ACCESS_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  const baseURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet`
  const commonQuery = `&regionCode=kr&type=video&order=relevance&videoSyndicated=true&maxResults=${maxResults}`
  const URL = `${baseURL}${commonQuery}${optionalQuery}&key=${ACCESS_KEY}`

  let response
  try {
    response = await axios.get(URL)
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  if (!response) {
    throw new Error('data is not defined')
  }

  return response.data
}

const youtubeJsonRequest = async (
  apiType: string = 'popular',
  optionalQuery: string = '&chart=mostPopular',
) => {
  let jsonData
  if (apiType === 'popular') {
    jsonData = await import('@public/videos/christmas/christmasPopular_v1.json')
  } else {
    jsonData = await import(
      `@public/videos/christmas/searchByChannels/search-by-channel-id-${optionalQuery}.json`
    )
  }

  return jsonData.default
}

export { youtubeApiRequest, youtubeJsonRequest }
