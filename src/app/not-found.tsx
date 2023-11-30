import Link from 'next/link'
import styles from './page.module.scss'
import Image from 'next/image'

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div>
        <p className={styles.tag}>Not Found</p>
        <h1>페이지를 찾을 수 없습니다</h1>
        <Image
          src="/assets/not-found.png"
          width={0}
          height={0}
          sizes="15rem"
          style={{width: '15rem', height: 'auto'}}
          alt=""
        />
        <Link href="/">홈으로 돌아가기</Link>
      </div>
    </div>
  )
}

export default NotFound
