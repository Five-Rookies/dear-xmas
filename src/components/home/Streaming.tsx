import styles from '@/app/page.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import formatRelativeDate from '@/utils/relativeDate'
import useYoutubeDataRequest from '@/hooks/useYoutubeApiRequest'

const Streaming = () => {
  return (
    <div className='inner-box'>
      <h2>Streaming</h2>
      <p>현재 인기있는 촛불 모임에 참가해보세요!</p>
      <ul className={styles.videoList}>
        <li
          className={`videoCard ${styles.videoCard}`}
        >
          <Link
            className={styles.videoLink}
            href="http://naver.com"
          >
            <div>
              <img className={styles.videoImage} src="http://via.placeholder.com/640x300" alt=""/>
              <span className={styles.tag}>NOW</span>
            </div>
            <div className={styles.titleArea}>
              <div className={styles.title}>
                <span className={styles.date}>12/06 17:00</span>
                <h4>함께 캐롤 들으며 스터디해요</h4>
              </div>
              <div className={styles.channelTitle}>
                <span>쿠키맨이지롱 · 스터디</span>
              </div>
            </div>
          </Link>
        </li>
        <li
          className={`videoCard ${styles.videoCard}`}
        >
          <Link
            className={styles.videoLink}
            href="http://naver.com"
          >
            <div>
              <img className={styles.videoImage} src="http://via.placeholder.com/640x300" alt=""/>
              <span className={styles.tag}>NOW</span>
            </div>
            <div className={styles.titleArea}>
              <div className={styles.title}>
                <span className={styles.date}>12/06 17:00</span>
                <h4>함께 캐롤 들으며 스터디해요</h4>
              </div>
              <div className={styles.channelTitle}>
                <span>쿠키맨이지롱 · 스터디</span>
              </div>
            </div>
          </Link>
        </li>
        <li
          className={`videoCard ${styles.videoCard}`}
        >
          <Link
            className={styles.videoLink}
            href="http://naver.com"
          >
            <div>
              <img className={styles.videoImage} src="http://via.placeholder.com/640x300" alt=""/>
              <span className={styles.tag}>NOW</span>
            </div>
            <div className={styles.titleArea}>
              <div className={styles.title}>
                <span className={styles.date}>12/06 17:00</span>
                <h4>함께 캐롤 들으며 스터디해요</h4>
              </div>
              <div className={styles.channelTitle}>
                <span>쿠키맨이지롱 · 스터디</span>
              </div>
            </div>
          </Link>
        </li>
        <li
          className={`videoCard ${styles.videoCard}`}
        >
          <Link
            className={styles.videoLink}
            href="http://naver.com"
          >
            <div>
              <img className={styles.videoImage} src="http://via.placeholder.com/640x300" alt=""/>
              <span className={styles.tag}>NOW</span>
            </div>
            <div className={styles.titleArea}>
              <div className={styles.title}>
                <span className={styles.date}>12/06 17:00</span>
                <h4>함께 캐롤 들으며 스터디해요</h4>
              </div>
              <div className={styles.channelTitle}>
                <span>쿠키맨이지롱 · 스터디</span>
              </div>
            </div>
          </Link>
        </li>
        <li
          className={`videoCard ${styles.videoCard}`}
        >
          <Link
            className={styles.videoLink}
            href="http://naver.com"
          >
            <div>
              <img className={styles.videoImage} src="http://via.placeholder.com/640x300" alt=""/>
              <span className={styles.tag}>NOW</span>
            </div>
            <div className={styles.titleArea}>
              <div className={styles.title}>
                <span className={styles.date}>12/06 17:00</span>
                <h4>함께 캐롤 들으며 스터디해요</h4>
              </div>
              <div className={styles.channelTitle}>
                <span>쿠키맨이지롱 · 스터디</span>
              </div>
            </div>
          </Link>
        </li>
        <li
          className={`videoCard ${styles.videoCard}`}
        >
          <Link
            className={styles.videoLink}
            href="http://naver.com"
          >
            <div>
              <img className={styles.videoImage} src="http://via.placeholder.com/640x300" alt=""/>
              <span className={styles.tag}>NOW</span>
            </div>
            <div className={styles.titleArea}>
              <div className={styles.title}>
                <span className={styles.date}>12/06 17:00</span>
                <h4>함께 캐롤 들으며 스터디해요</h4>
              </div>
              <div className={styles.channelTitle}>
                <span>쿠키맨이지롱 · 스터디</span>
              </div>
            </div>
          </Link>
        </li>
        <li
          className={`videoCard ${styles.videoCard}`}
        >
          <Link
            className={styles.videoLink}
            href="http://naver.com"
          >
            <div>
              <img className={styles.videoImage} src="http://via.placeholder.com/640x300" alt=""/>
              <span className={styles.tag}>NOW</span>
            </div>
            <div className={styles.titleArea}>
              <div className={styles.title}>
                <span className={styles.date}>12/06 17:00</span>
                <h4>함께 캐롤 들으며 스터디해요</h4>
              </div>
              <div className={styles.channelTitle}>
                <span>쿠키맨이지롱 · 스터디</span>
              </div>
            </div>
          </Link>
        </li>
        <li
          className={`videoCard ${styles.videoCard}`}
        >
          <Link
            className={styles.videoLink}
            href="http://naver.com"
          >
            <div>
              <img className={styles.videoImage} src="http://via.placeholder.com/640x300" alt=""/>
              <span className={styles.tag}>NOW</span>
            </div>
            <div className={styles.titleArea}>
              <div className={styles.title}>
                <span className={styles.date}>12/06 17:00</span>
                <h4>함께 캐롤 들으며 스터디해요</h4>
              </div>
              <div className={styles.channelTitle}>
                <span>쿠키맨이지롱 · 스터디</span>
              </div>
            </div>
          </Link>
        </li>
      </ul>
      <button className='moreBtn'>+ 더보기</button>
    </div>
  )
};

export default Streaming;