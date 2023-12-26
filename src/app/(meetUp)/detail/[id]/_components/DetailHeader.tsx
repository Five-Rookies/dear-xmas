'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import styles from '../detail.module.scss'

const DetailHeader = ({
  title,
  back,
}: {
  title: string | undefined
  back: string
}) => {
  const router = useRouter()
  return (
    <header className={styles.header}>
      <button
        type="button"
        onClick={() =>
          back === 'live' ? router.push('/meetup') : router.back()
        }
      >
        <img src="/assets/left-arrow.svg" alt="뒤로가기 아이콘" />
        <span>이전으로</span>
      </button>
      <p>{title}</p>
    </header>
  )
}

export default DetailHeader
