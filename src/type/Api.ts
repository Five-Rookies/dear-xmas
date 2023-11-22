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
  standard: {
    url: string
    width: number
    height: number
  }
  maxres: {
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
  categoryId: string
  liveBroadcastContent: string
  defaultLanguage?: string
  localized: {
    title: string
    description: string
  }
  defaultAudioLanguage?: string
}

export interface IVideo {
  kind: string
  etag: string
  id: string
  snippet: ISnippet
}

export interface IId {
  kind: string
  videoId: string
}

export interface IChannelVideo {
  kind: string
  etag: string
  id: IId
  snippet: ISnippet
}
