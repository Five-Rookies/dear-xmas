import React from 'react'
import SEARCH_LIST from '@public/videos/searchByChannels/search-by-channel-id-UC1x03ziDHPct2xTikLyfMDA.json'
import SearchResult from '@/components/SearchResult'
import axios from 'axios'

interface Video {
  snippet: {
    title: string
  }
}

// const Search = async (): Promise<React.JSX.Element> => {
const Search = (): React.JSX.Element => {
  // const res = await axios.get(``)
  return <SearchResult props={SEARCH_LIST.items} />
}
export default Search
