'use client'

import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from './header.module.scss'

const SearchInput = (): React.JSX.Element => {
  const router = useRouter()
  const searchInput = useRef<HTMLInputElement>(null)

  const handleSearch = (): void => {
    const searchTerm = searchInput?.current?.value
    if (!searchTerm) {
      return router.push('/')
    }
    document.cookie = `keyword=${encodeURIComponent(searchTerm)}`
    router.push(`/search?keyword=${encodeURIComponent(searchTerm)}`)
  }

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className={styles.searchInput}>
      <input
        type="text"
        placeholder="보고싶은 영상을 검색해보세요!"
        autoFocus
        autoComplete="off"
        name="search-input"
        ref={searchInput}
        onKeyDown={handleKeyPress}
      />
      <button type="button" onClick={handleSearch}>
        <img src="/assets/header_search_icon.svg" alt="" />
      </button>
    </div>
  )
}

export default SearchInput
