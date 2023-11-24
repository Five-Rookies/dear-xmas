'use client'

import { useState, useEffect, useRef } from 'react'
import styles from '@/app/mainList/page.module.scss'
import formatRelativeDate from '@/utils/relativeDate'
import Link from 'next/link'
import { IVideo } from '@/type/Api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

type VideoListType = IVideo[]

const VideoList = ({ videoList }: { videoList: VideoListType }) => {
  //스크롤버튼
  const sectionList = useRef(null);
  const videoCardRef = useRef<HTMLLIElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  //무한스크롤
  const [list, setList] = useState();//영상목록 저장
  const [searchQ, setSearchQ] = useState();//마지막으로 검색한 단어를 저장, nextPageToken 사용할 때 필요
  const [nextPageToken, setNextPageToken] = useState();//nextPageToken을 저장
  const [isLoading, setIsLoading]= useState(false);//로딩중 애니메이션 state

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //스크롤이 최하단에 있을 때
    const atBottom = currentScrollTop + window.innerHeight >= document.documentElement.scrollHeight;
  
    setIsAtBottom(atBottom);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = () => {
    const cardHeight = videoCardRef.current?.offsetHeight || 0;
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    //이동할 스크롤 위치 계산
    const newScrollTop = isAtBottom ? 0 : currentScrollTop + cardHeight;
 
    //다음 위치로 스크롤
    window.scrollTo({
      top: newScrollTop,
      behavior: 'smooth',
    })
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
                href={{
                  pathname: `/detail/${video.id}`,
                }}
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
        onClick={() => scrollToSection()}>
          <FontAwesomeIcon 
            className={styles.arrowDownIcon} 
            icon={isAtBottom ? faArrowUp : faArrowDown}
          />
        </button>
    </>
  )
}

export default VideoList
