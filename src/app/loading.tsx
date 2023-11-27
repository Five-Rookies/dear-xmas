import styles from './page.module.scss'
const Loading = () => {
  return (
    <div className={styles.Loading}>
      <div>
        <p className={styles.tag}>Loading...</p>
        <h1>잠시만 기다려주세요</h1>
        <img src="/assets/loading.png" alt="" />
      </div>
    </div>
  )
}

export default Loading
