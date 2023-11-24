'use client'

import React, { useRef } from 'react'
import styles from '@/app/mainList/page.module.scss'
import formatRelativeDate from '@/utils/relativeDate'
import Link from 'next/link'
import { IVideo } from '@/type/Api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

type VideoListType = IVideo[]

const VideoList = ({ videoList }: { videoList: VideoListType }) => {
  const sectionList = useRef(null);
  const videoCardRef = useRef<HTMLLIElement | null>(null);

  const scrollToSection = (
    elementRef: React.MutableRefObject<HTMLButtonElement | null>,
  ) => {
    if(elementRef.current !== null) {
      const offset = elementRef.current.offsetTop;
      const cardHeight = videoCardRef.current?.offsetHeight || 0;
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      //이동할 스크롤 위치 계산
      //const newScrollTop = currentScrollTop + (offset === 0 ? -currentScrollTop : cardHeight);
      const newScrollTop = currentScrollTop === window.innerHeight ? elementRef.current.offsetTop : currentScrollTop + cardHeight;
      console.log(currentScrollTop);
      //다음 위치로 스크롤
      window.scrollTo({
        top: newScrollTop,
        behavior: 'smooth',
      })
    }
  }
  
  return (
    <>
      <ul className={styles.videoList} ref={sectionList}>
        {videoList.map((video: IVideo) => {
          const VIDEO = video.snippet
          return (
            <li 
              className={`videoCard ${styles.videoCard}`} 
              key={video.id}
              ref={videoCardRef}
            >
              <Link
                className={styles.videoLink}
                href={`https://www.youtube.com/watch?v=${video.id}`}
              >
                <div>
                  <img
                    className={styles.videoImage}
                    src={VIDEO.thumbnails.medium.url}
                    width={300}
                  />
                </div>
                <div className={styles.title}>
                  <h4>{VIDEO.title}</h4>
                </div>
              </Link>
              <Link
                className={styles.videoLink}
                href={{
                  pathname: `/detail/${video.id}`,
                }}
              >
                <div className={styles.channelTitle}>
                  <span>{VIDEO.channelTitle}</span>
                </div>
              </Link>
              <div className={styles.publishedAt}>
                <span>{formatRelativeDate(VIDEO.publishedAt)}</span>
              </div>
            </li>
          )
        })}
      </ul>
      <button 
        className={`scrollBtn ${styles.scrollBtn}`}
        onClick={() => scrollToSection(sectionList)}>
          <FontAwesomeIcon className={styles.arrowDownIcon} icon={faArrowDown} />
        </button>
    </>
  )
}

export default VideoList
