import React from 'react'
import LiveStream from './_components/LiveStream'
import LiveChat from './_components/LiveChat'
import styles from './live.module.scss'
import { getChat, getLive } from '@/utils/apiRequest/commentsApiRequest'
import DetailHeader from '../detail/[id]/_components/DetailHeader'

const LivePage = async (param: any) => {
  const currentMeetupId = param.searchParams.meetup_id
  const chatData = await getChat(currentMeetupId)
  const meetupData = await getLive(currentMeetupId)
  const user = { profile_img: 0, user_name: '산타', user_id: 2 } // 추후 로그인 유저 정보 백엔드 연결 후 가져올 예정
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
          <LiveChat
            chatData={chatData}
            user={user}
            meetupId={currentMeetupId}
          />
        </div>
      </div>
    </div>
  )
}

export default LivePage
