'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/app/page.module.scss'
import Link from 'next/link'
import { IYoutubeItem } from '@/type/YoutubeApiResponse'
import useYoutubeDataRequest from '@/hooks/useYoutubeApiRequest'
import formatRelativeDate from '@/utils/relativeDate'
import useLoadMore from '@/hooks/useLoadMore'
import { IMeetupBoardData } from '@/type/Component'

type VideoListType = IYoutubeItem[]

const MainMeetupList = ({
  todayMeetup,
}: {
  todayMeetup: IMeetupBoardData[]
}) => {
  const { loadedCount, loadMore } = useLoadMore(4, 4)
  return (
    <div>
      <ul className={styles.meetupList}>
        {todayMeetup.slice(0, loadedCount).map(meetup => {
          return (
            <li key={meetup.id}>
              <Link href={`/live?meetup_id=${meetup.id}`}>
                <div className={styles.imgFrame}>
                  <img src={meetup.thumbnail} alt={meetup.meetup_title} />
                  <span className={styles.tag}>Today</span>
                </div>
                <div className={styles.titleArea}>
                  <div>
                    <span className={styles.date}>{meetup.category} </span>
                    <h4>{meetup.meetup_title}</h4>
                  </div>
                  <div className={styles.channelName}>
                    <span>
                      {' '}
                      {formatRelativeDate(
                        new Date(meetup?.scheduling as string).toISOString(),
                      )}{' '}
                      열림
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
      {loadedCount < todayMeetup.length && (
        <button className="btn btn--white" onClick={loadMore}>
          + 더보기
        </button>
      )}
    </div>
  )
}

export default MainMeetupList
