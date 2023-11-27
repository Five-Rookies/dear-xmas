import Link from 'next/link'
import styles from './page.module.scss'

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div>
        <p className={styles.tag}>Not Found</p>
        <h1>페이지를 찾을 수 없습니다</h1>
        <img src="/assets/not-found.png" alt="" />
        <Link href="/">홈으로 돌아가기</Link>
      </div>
    </div>
  )
}

export default NotFound
