import axios from 'axios'
import { IYoutubeResponse } from '@/type/YoutubeApiResponse'

interface IParameter {
  [info: string]: string
}

const youtubeApiRequest = async (
  optionalQuery?: IParameter,
): Promise<IYoutubeResponse> => {
  try {
    const URL = process.env.NEXT_PUBLIC_YOUTUBE_API_URL as string
    const youtubeApiData = await axios.get<IYoutubeResponse>(URL, {
      params: {
        part: 'snippet',
        maxResults: '8',
        q: '크리스마스|크리스마스영화',
        type: 'video',
        regionCode: 'kr',
        ...optionalQuery,
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      },
    })

    return youtubeApiData.data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    throw new Error('[ERROR] Youtube API 요청 불가.')
  }
}

export default youtubeApiRequest
