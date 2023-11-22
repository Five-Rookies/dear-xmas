'use client'
import React, { useRef } from 'react'
import Link from 'next/link'
import styles from '@/components/header.module.scss'
import { useRouter } from 'next/navigation'

const Search = (): React.JSX.Element => {
  const router = useRouter()
  const searchInput = useRef<HTMLInputElement>(null)
  const handleSearch = (): void => {
    const searchTerm = searchInput?.current?.value
    if (searchTerm) {
      router.push(`/search?info=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <div className={styles.searchInput}>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        autoFocus
        autoComplete="off"
        ref={searchInput}
      />

      <button type="button" onClick={handleSearch}>
        <img src="/asset/header_search_icon.svg" alt="" />
      </button>
    </div>
  )
}

export default Search
