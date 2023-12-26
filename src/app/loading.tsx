import Image from 'next/image'
import styles from './page.module.scss'

const Loading = () => {
  return (
    <div className={styles.Loading}>
      <div>
        <p className={styles.tag}>Loading...</p>
        <h1>잠시만 기다려주세요</h1>
        <Image
          src="/assets/loading.png"
          width={0}
          height={0}
          sizes="15rem"
          style={{ width: '15rem', height: 'auto' }}
          alt=""
        />
      </div>
    </div>
  )
}

export default Loading
