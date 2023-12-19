import React from 'react'
import { cookies } from 'next/headers'
import youtubeRequest from '@/utils/youtubRequest/youtubeRequest'
import { IYoutubeItem } from '@/type/YoutubeApiResponse'
import SearchList from './_components/SearchList'
import NoResult from './_components/NoResult'

const getSearchResults = async (keyword: string) => {
  const { itemList, pageToken = '' } = await youtubeRequest({
    apiType: 'search',
    optionalQuery: {
      q: keyword,
      maxResults: '12',
    },
  })
  const searchResults = itemList.filter((el: IYoutubeItem): boolean => {
    return el.snippet.title.includes(keyword)
  })

  return { searchResults, pageToken }
}

const SearchPage = async () => {
  const cookieStore = cookies()
  const keyword = cookieStore.get('search-keyword')?.value
  const { searchResults, pageToken } = await getSearchResults(keyword!)

  return (
    <>
      {searchResults.length ? (
        <SearchList
          initialData={searchResults}
          keyword={keyword as string}
          pageToken={pageToken}
        />
      ) : (
        <NoResult />
      )}
    </>
  )
}

export default SearchPage
