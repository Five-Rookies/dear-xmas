'use server'

import React from 'react'
import styles from './meetup.module.scss'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import MeetupTabButtons from './_components/_tab/MeetupTabButtons'
import MeetupTabPage from './_components/_tab/MeetupTabPage'

const MeetupLayout = async (props: any): Promise<React.JSX.Element> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  })

  const { data } = await supabase.auth.getSession()
  const userName: string = data.session?.user.user_metadata.user_name

  // console.log('### meetup page getSession ###')
  // console.log(data.session)
  // console.log(data.se  const cookieStore = cookies()
  return (
    <div className={styles.layout}>
      <div style={{ paddingTop: '4.6619rem' }}>
        <div className={`inner-box ${styles.pageHeader}`}>
          <div>
            <h1>안녕하세요, {userName}님</h1>
            <p>촛불 모임에서 친구들과 특별한 크리스마스 추억을 쌓아보세요.</p>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <MeetupTabButtons />
        <MeetupTabPage>{props.children}</MeetupTabPage>
      </div>
    </div>
  )
}

export default MeetupLayout
