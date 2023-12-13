import React from 'react'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import styles from './meetup.module.scss'
import MeetupEventButtons from './_components/MeetupEventButtons'
import VideoList from './_components/VideoList'
import MeetupList from './_components/MeetupList'

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

  return (
    <div style={{ paddingTop: '4.6619rem' }}>
      <div className={`inner-box ${styles.pageHeader}`}>
        <div>
          <h1>안녕하세요, {userName}님</h1>
          <p>촛불 모임에서 특별한 사람과 크리스마스의 추억을 쌓아보세요.</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={`inner-box ${styles.contents}`}>
          <MeetupEventButtons />
          <MeetupList />
          <VideoList />
        </div>
      </div>
    </div>
  )
}

export default MeetupPage
