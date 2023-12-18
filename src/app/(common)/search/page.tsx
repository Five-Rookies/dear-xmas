import React from 'react'
import { cookies } from 'next/headers'
import youtubeDataRequest from '@/utils/apiRequest/youtubeApiRequest'
import { IYoutubeResponse, IYoutubeItem } from '@/type/YoutubeApiResponse'
import SearchList from './_components/SearchList'
import NoResult from './_components/NoResult'

const SearchPage = async () => {
  const cookieStore = cookies()
  const keyword = cookieStore.get('keyword')?.value
  let searchResults: IYoutubeItem[] | [] = []
  if (keyword) {
    const result = await youtubeDataRequest<IYoutubeResponse>(
      'search',
      `&q=${keyword}`,
      25,
    )
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
