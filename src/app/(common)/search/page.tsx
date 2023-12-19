import React from 'react'
import { cookies } from 'next/headers'
import youtubeDataRequest from '@/utils/youtubApiRequest/youtubeApiRequest'
import { IYoutubeResponse, IYoutubeItem } from '@/type/YoutubeApiResponse'
import SearchList from './_components/SearchList'
import NoResult from './_components/NoResult'

const SearchPage = async () => {
  const cookieStore = cookies()
  const keyword = cookieStore.get('search-keyword')?.value
  let searchResults: IYoutubeItem[] | [] = []
  let pageToken: string = ''

  if (keyword) {
    const { nextPageToken, items } = await youtubeDataRequest<IYoutubeResponse>(
      {
        apiType: 'search',
        optionalQuery: { q: keyword, maxResults: '12' },
      },
    )

    searchResults = items.filter((el: IYoutubeItem): boolean => {
      return el.snippet.title.includes(keyword || '')
    })
    pageToken = nextPageToken
  }

  return (
    <>
      {searchResults.length ? (
        <SearchList searchResult={searchResults} pageToken={pageToken} />
      ) : (
        <NoResult />
      )}
    </>
  )
}

export default SearchPage
