import { IYoutubeResponse } from '@/type/YoutubeApiResponse'

interface IParameter {
  apiType: string
  optionalQuery?: { [info: string]: string }
}

const youtubeJsonRequest = async ({
  apiType,
  optionalQuery,
}: IParameter): Promise<IYoutubeResponse> => {
  try {
    let jsonData
    if (apiType === 'popular' || apiType === 'search') {
      jsonData = await import(
        `@public/videos/christmas/christmasPopular_v1.json`
      )
    } else if (optionalQuery) {
      const { channelId } = optionalQuery
      jsonData = await import(
        `@public/videos/christmas/searchByChannels/search-by-channel-id-${channelId}.json`
      )
    }

    return jsonData.default
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    throw new Error('[ERROR] 유효하지 않은 JSON 데이터 요청입니다.')
  }
}

export default youtubeJsonRequest
