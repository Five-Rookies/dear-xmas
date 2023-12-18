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
  if (keyword) {
    const result = await youtubeDataRequest<IYoutubeResponse>({
      apiType: 'search',
      optionalQuery: { q: keyword },
      maxResults: 12,
    })
    searchResults = result.items.filter((el: IYoutubeItem): boolean => {
      return el.snippet.title.includes(keyword || '')
    })
  }

  return (
    <>
      {searchResults.length ? (
        <SearchList searchResult={searchResults} />
      ) : (
        <NoResult />
      )}
    </>
  )
}

export default SearchPage
