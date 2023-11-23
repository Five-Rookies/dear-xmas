import axios from 'axios'

interface IYoutubeApiRequest {
  apiType: 'videos' | 'search'
  optionalQuery: string
  maxResults: number
}

const youtubeApiRequest = async ({
  apiType,
  optionalQuery,
  maxResults,
}: IYoutubeApiRequest) => {
  const ACCESS_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  const BASIC_URL = `https://youtube.googleapis.com/youtube/v3/${apiType}?part=snippet&regionCode=kr`
  const URL = `${BASIC_URL}${optionalQuery}&maxResults=${maxResults}&key=${ACCESS_KEY}`
  let response = ''
  try {
    response = await axios.get(URL)
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  if (!response) {
    throw new Error('data is not defined')
  }

  return response
}

export default youtubeApiRequest

// [['chart', 'mostPopular'] , ['maxResults','32' ]]
// `&chart=mostPopular&maxResults=32`
// `&chart=mostPopular&maxResults=32`
// &channelId=${channelId}&q=surfing
// &maxResults=25
//

// &maxResults=25
// &q=${search}
// &type=video
// &regionCode=kr
