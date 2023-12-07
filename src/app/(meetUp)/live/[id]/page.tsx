import React from 'react'
import LiveStream from './_components/LiveStream'
import LiveChat from './_components/LiveChat'
import styles from './live.module.scss'
import { GetChat } from '@/utils/apiRequest/commentsApiRequest'
import DetailHeader from '../../detail/[id]/_components/DetailHeader'

const LivePage = async (props: any) => {
  const currentVideoId = props.params.id
  const data = await GetChat(currentVideoId)
  const user = { profile_img: 0, nick_name: '산타', user_id: 2 } // 추후 로그인 유저 정보 백엔드 연결 후 가져올 예정
  return (
    <div className="inner-box">
      <div className={styles.container}>
        <DetailHeader title="라이브 스트리밍" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>영상준비중입니다</h1>
          <button className={styles.liveBtn}>재생하기</button>
        </div>
        <div className={styles.liveBox}>
          <LiveStream />
          <LiveChat serverData={data} user={user} videoId={currentVideoId} />
        </div>
      </div>
    </div>
  )
}

export default LivePage
