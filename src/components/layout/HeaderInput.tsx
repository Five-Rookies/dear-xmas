'use client'

import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from './header.module.scss'

const HeaderInput = (): React.JSX.Element => {
  const router = useRouter()
  const searchInput = useRef<HTMLInputElement>(null)
  const handleSearch = (): void => {
    const searchTerm = searchInput?.current?.value
    if (!searchTerm) {
      return router.push('/')
    }
    router.push(`/search?info=${encodeURIComponent(searchTerm)}`)
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
        placeholder="제목을 입력하세요"
        autoFocus
        autoComplete="off"
        name="search-input"
        ref={searchInput}
        onKeyPress={handleKeyPress}
      />
      <button type="button" onClick={handleSearch}>
        <img src="/assets/header_search_icon.svg" alt="" />
      </button>
    </div>
  )
}

export default HeaderInput
