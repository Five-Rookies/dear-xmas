'use client'
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import datas from '../../../public/videos/popular.json'
import Header from '../../components/Header'

interface Video {
  snippet: {
    title: string
  }
}

const Search = (): React.ReactNode => {
  const router = useRouter()
  const [search, setSearch] = useState<string>('')

  const handleSearchValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
      router.push('/search')
    },
    [router],
  )

  const filterData = datas.items.filter((data: Video): boolean => {
    return data.snippet.title.includes(search)
  })

  return (
    <div>
      <Header
        search={search}
        setSearch={setSearch}
        handleSearchValue={handleSearchValue}
      />
      {search && (
        <div>
          {filterData.map((el: Video, index: number) => (
            <div key={index}>{el.snippet.title}</div>
          ))}
        </div>
      )}
    </div>
  )
}
export default Search
