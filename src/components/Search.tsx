'use client'
import React, { useRef } from 'react'
import Link from 'next/link'
import styles from '@/components/header.module.scss'
import { useRouter } from 'next/navigation'

const Search = (): React.JSX.Element => {
  const router = useRouter()
  const searchInput = useRef<HTMLInputElement>(null)
  const handleSearch = (): void => {
    searchInput?.current?.value
      ? router.push(`/search?info=${searchInput.current.value}`)
      : router.push('/')
  }

  return (
    <Link className={styles.searchInput} href="/search">
      <input
        type="text"
        placeholder="제목을 입력하세요"
        autoFocus
        autoComplete="off"
        onChange={handleSearch}
        ref={searchInput}
      />

      <button type="button">
        <img src="/asset/header_search_icon.svg" alt="" />
      </button>
    </Link>
  )
}

export default Search
