'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from '@/app/page.module.scss'

const ErrorPage = () => {
  return (
    <div className={styles.notFound}>
      <div>
        <p className={styles.tag}>Error</p>
        <h1>오류가 발생했습니다.</h1>
        <Image
          src="/assets/not-found.png"
          width={0}
          height={0}
          sizes="15rem"
          style={{ width: '15rem', height: 'auto' }}
          alt=""
        />
        <Link href="/">홈으로 돌아가기</Link>
      </div>
    </div>
  )
}

export default ErrorPage
