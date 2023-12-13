'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from '../../page.module.scss'

const Error = () => {
  return (
    <div className={styles.notFound}>
      <div>
        <p className={styles.tag}>THE END</p>
        <h1>촛불모임이 종료되었습니다</h1>
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

export default Error
