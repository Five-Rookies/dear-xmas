import React from 'react'
import { cookies } from 'next/headers'
import youtubeRequest from '@/utils/youtubRequest/youtubeRequest'
import { IYoutubeItem } from '@/type/YoutubeApiResponse'
import SearchList from './_components/SearchList'
import NoResult from './_components/NoResult'

const SearchPage = async () => {
  const getSearchResults = async (keyword: string) => {
    const { itemList } = await youtubeRequest({
      apiType: 'search',
      optionalQuery: {
        q: keyword,
        maxResults: '20',
      },
    })
    const searchResults = itemList.filter((el: IYoutubeItem): boolean => {
      return el.snippet.title.includes(keyword)
    })

    return { searchResults }
  }

  const cookieStore = cookies()
  const keyword = cookieStore.get('search-keyword')?.value
  const { searchResults } = await getSearchResults(keyword!)

  return <>{searchResults.length ? <SearchList /> : <NoResult />}</>
}

export default SearchPage
