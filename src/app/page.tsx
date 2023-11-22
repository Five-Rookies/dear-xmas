import styles from './page.module.scss'

export default function Home() {
  return (
    <main>
      <section className={styles.bg}>
        <ul className={styles.tree}>
          <li>
            <img src="/assets/tree.png" alt="" />
          </li>
          <li>
            <img src="/assets/tree.png" alt="" />
          </li>
          <li>
            <img src="/assets/tree.png" alt="" />
          </li>
          <li>
            <img src="/assets/tree.png" alt="" />
          </li>
        </ul>
        <div className={styles.snowBg}></div>
        <img className={styles.santa} src="/assets/santa.png" alt="" />
      </section>

      <div className="innerBox"></div>
    </main>
  )
}
