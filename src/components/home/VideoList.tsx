'use client'

import { useEffect, useState, useCallback } from 'react'
import styles from '@/app/page.module.scss'
import formatRelativeDate from '@/utils/relativeDate'
import Link from 'next/link'
import { IYoutubeItem } from '@/type/Api'
import ScrollBtn from '@/components/ScrollBtn'
import youtubeDataRequest from '@/utils/apiRequest/youtubeApiRequest'

const VideoList:React.FC = () => {
  //const videoList: VideoListType = await getVideoList()
  //const videoCardRef = useRef<HTMLLIElement | null>(null)
  const [pageToken, setPageToken] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [allVideos, setAllVideos] = useState<VideoListType>([]);

  const getVideoList = async (pageToken?: string) => {
    const response = await youtubeDataRequest('popular', '&q=크리스마스|크리스마스영화', 4, pageToken);
    return response.items
  }

   const fetchMoreVideos = useCallback(async () => {
     if (isLoading) return;

     try {
       setIsLoading(true);
       const nextPageVideos = await getVideoList(pageToken);
       const newVideos = nextPageVideos.filter(
         (newVideo: any) => !allVideos.some((existingVideos) => existingVideos.id.videoId === newVideo.id.videoId)
       )
       if (nextPageVideos.length > 0) {
         setAllVideos((prevVideos) => [...prevVideos, ...nextPageVideos]);
         setPageToken(nextPageVideos.nextPageToken);
       }
     } finally {
       setIsLoading(false);
     }
   },[isLoading, pageToken, allVideos])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const isNearBottom = scrollY + windowHeight >= scrollHeight - 200;
    
      if (isNearBottom && !isLoading) {
        fetchMoreVideos();
      }
    };

    window.addEventListener('scroll', handleScroll);
    

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    
  }, [isLoading, fetchMoreVideos]);



  return (
    <>
      <ul className={styles.videoList}>
        {allVideos.map((video: IYoutubeItem, index: number) => {
          const VIDEO = video.snippet
          return (
            <li
              className={`videoCard ${styles.videoCard}`}
              key={video.id.videoId + index}
            >
              <Link
                className={styles.videoLink}
                href={{
                  pathname: `/detail/${video.id.videoId}`,
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
                  pathname: `/detail/${video.id.videoId}`,
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
      {isLoading && <p>Loading...</p>}
      <ScrollBtn />
    </>
  )
}

export default VideoList
