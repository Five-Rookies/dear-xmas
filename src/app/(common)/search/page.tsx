import React from 'react'
import { cookies } from 'next/headers'
import youtubeApiRequest from '@/utils/youtubRequest/youtubeApiRequest'
import youtubeJsonRequest from '@/utils/youtubRequest/youtubeJsonRequest'
import { IYoutubeItem } from '@/type/YoutubeApiResponse'
import SearchList from './_components/SearchList'
import NoResult from './_components/NoResult'

const SearchPage = async () => {
  const cookieStore = cookies()
  const keyword = cookieStore.get('search-keyword')?.value
  let totalItems: IYoutubeItem[] = []
  let searchResults: IYoutubeItem[] | [] = []
  let pageToken: string = ''

  if (keyword) {
    try {
      const { nextPageToken, items } = await youtubeApiRequest({
        q: keyword,
        maxResults: '12',
      })
      totalItems = items
      pageToken = nextPageToken
    } catch {
      const { items } = await youtubeJsonRequest({
        apiType: 'search',
      })
      totalItems = items
    } finally {
      searchResults = totalItems.filter((el: IYoutubeItem): boolean => {
        return el.snippet.title.includes(keyword)
      })
    }
  }

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
