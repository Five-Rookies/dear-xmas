export interface IThumbnails {
  default: {
    url: string
    width: number
    height: number
  }
  medium: {
    url: string
    width: number
    height: number
  }
  high: {
    url: string
    width: number
    height: number
  }
  standard?: {
    url: string
    width: number
    height: number
  }
  maxres?: {
    url: string
    width: number
    height: number
  }
}

export interface ISnippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: IThumbnails
  channelTitle: string
  tags?: string[]
  categoryId?: string
  liveBroadcastContent: string
  defaultLanguage?: string
  localized?: {
    title: string
    description: string
  }
  defaultAudioLanguage?: string
  publishTime?: string
}

export interface IYoutubeItem {
  kind: string
  etag: string
  id: {
    kind: string
    videoId: string
  }
  snippet: ISnippet
}

export interface IYoutubeResponse {
  kind: string
  etag: string
  nextPageToken: string
  regionCode: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: IYoutubeItem[]
}
