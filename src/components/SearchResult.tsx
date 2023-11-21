'use client'

import { useSearchParams } from 'next/navigation'

interface Thumbnails {
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
}
interface Snippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: Thumbnails
  channelTitle: string
  liveBroadcastContent: string
  publishTime: string
}
interface Id {
  kind: string
  videoId: string
}

interface Items {
  kind: string
  etag: string
  id: Id
  snippet: Snippet
}

interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

interface IResult {
  etag: string
  kind: string
  nextPageToken: string
  regionCode: string
  pageInfo: PageInfo
  items: Items[]
}
const SearchResult = ({ props }: { props: Items[] }): JSX.Element => {
  const searchParams = useSearchParams()
  const search = searchParams.get('info')
  const filteredItems = props?.filter((el: Items): boolean => {
    return el.snippet.title.includes(search ? search : '')
  })

  return (
    <div>
      {filteredItems?.map((item: Items, index: number) => (
        <div key={item.snippet.title}>
          <p>Title: {item.snippet.title}</p>
          {/* Add other properties you want to display */}
        </div>
      ))}
    </div>
  )
}

export default SearchResult
