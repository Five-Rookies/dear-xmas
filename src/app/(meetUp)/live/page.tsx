import React from 'react'
import LiveStream from './_components/LiveStream'
import styles from './live.module.scss'
import { getLive } from '@/utils/apiRequest/commentsApiRequest'
import DetailHeader from '../detail/[id]/_components/DetailHeader'
import dynamic from 'next/dynamic'
const ComponentsWithNoSSR = dynamic<{ meetupId: any }>( // typescript에서 props를 전달할때 interface를 정의해줍니다.
  () => import('./_components/LiveChat'), // Component로 사용할 항목을 import합니다.
  { ssr: false }, // ssr옵션을 false로 설정해줍니다.
)
const LivePage = async (param: any) => {
  const currentMeetupId = param.searchParams.meetup_id
  const meetupData = await getLive(currentMeetupId)
  return (
    <div className="inner-box">
      <div className={styles.container}>
        <DetailHeader title="라이브 스트리밍" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>{meetupData.meetup_title}</h1>
          <button className={styles.liveBtn}>재생하기</button>
        </div>
        <div className={styles.liveBox}>
          <LiveStream videoId={meetupData.video_id} />
          <ComponentsWithNoSSR meetupId={currentMeetupId} />
        </div>
      </div>
    </div>
  )
}
export default LivePage
