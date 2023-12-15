import React from 'react'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import styles from './meetup.module.scss'
import MeetupTabPage from './_components/MeetupTabPage'
import { getMeetupList } from '@/utils/apiRequest/meetupApiRequest'

const MeetupPage = async () => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  })
  const { data } = await supabase.auth.getSession()
  const userName = data.session?.user.user_metadata.user_name

  // console.log('### meetup page getSession ###')
  // console.log(data.session)
  // console.log(data.session?.user.user_metadata.user_name)
  /**TODO -
   * 버튼 클릭시 해당 버튼에 따른 페이지 보여주기
   * 데이터 get 하는건 서버 컴포넌트에서 미리 하고 버튼 클릭시 보여주기
   * 생성된 모임에서 보여줄 게시물은 meetup-board 데이터 받아서 조회 하도록
   * 생성된 모임에 영상 보러가기 버튼 클릭 하면 해당 게시물의 디테일 페이지로 이동
   */
  const meetupList = await getMeetupList()

  return (
    <div style={{ paddingTop: '4.6619rem' }}>
      <div className={`inner-box ${styles.pageHeader}`}>
        <div>
          <h1>안녕하세요, {userName}님</h1>
          <p>촛불 모임에서 친구들과 특별한 크리스마스 추억을 쌓아보세요.</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={`inner-box ${styles.contents}`}>
          <MeetupTabPage meetupList={meetupList} />
        </div>
      </div>
    </div>
  )
}

export default MeetupPage
