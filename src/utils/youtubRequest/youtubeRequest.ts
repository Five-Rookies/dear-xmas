import { IYoutubeItem } from '@/type/YoutubeApiResponse'
import youtubeApiRequest from './youtubeApiRequest'
import youtubeJsonRequest from './youtubeJsonRequest'

interface IParameter {
  apiType: string
  optionalQuery?: { [info: string]: string }
}

interface IReturnData {
  itemList: IYoutubeItem[] | []
  pageToken: string
}

const youtubeRequest = async ({
  apiType,
  optionalQuery,
}: IParameter): Promise<IReturnData> => {
  let itemList: IYoutubeItem[] = []
  let pageToken: string = ''

  try {
    const { nextPageToken, items } = await youtubeApiRequest(optionalQuery)
    itemList = items
    pageToken = nextPageToken
  } catch {
    const { items } = await youtubeJsonRequest({ apiType, optionalQuery })
    itemList = items
  }

  return { itemList, pageToken }
}

export default youtubeRequest
