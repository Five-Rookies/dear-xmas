import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.scss'

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div>
        <p className={styles.tag}>Not Found</p>
        <h1>접근할 수 없는 페이지입니다</h1>
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

export default NotFound
