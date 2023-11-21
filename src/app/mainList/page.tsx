import Link from 'next/link'
import { NextPage } from 'next';
import styles from '@/app/mainList/page.module.scss'
import React from 'react'
import VIDEO_LIST from '@public/videos/popular.json'
import formatRelativeDate from '@/utils/relativeDate'
import { IVideo,ISnippet  } from '@/type/Api';

type VideoList = IVideo[]

const VideoListPage:NextPage<ISnippet> = (): React.JSX.Element => {
  const videoList: VideoList = VIDEO_LIST.items
  return (
    <div>
      <ul className={styles.videoList}>
        {videoList.map((video: IVideo) => {
          const VIDEO = video.snippet
          return (
            <li className={styles.videoCard}>
              <Link 
                className={styles.videoLink} 
                href={
                  {pathname:`/detail/${VIDEO.channelId}`,
                   query:{videoInfo: encodeURIComponent(JSON.stringify(VIDEO))}
                   }
                }
                // as={`/detail/${VIDEO.channelId}`}
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
              <Link className={styles.videoLink} href="">
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
    </div>
  )
}

export default VideoListPage
