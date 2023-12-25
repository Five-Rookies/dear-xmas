'use server'

import React from 'react'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import styles from './meetup.module.scss'
import MeetupTabButtons from './_components/_tab/MeetupTabButtons'
import MeetupTabPage from './_components/_tab/MeetupTabPage'
import { getProfile } from '@/utils/apiRequest/profileApiRequest'

const MeetupLayout = async (props: any): Promise<React.JSX.Element> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  })

  const { data } = await supabase.auth.getSession()
  const email = data.session?.user?.email
  const [userData] = await getProfile('email', email!)

  return (
    <div className={styles.layout}>
      <div
        className={`inner-box ${styles.pageContainer}`}
        style={{ paddingTop: '4.6619rem' }}
      >
        <div className={styles.pageHeader}>
          <div>
            <h1>안녕하세요, {userData.user_name}님</h1>
            <p>촛불 모임에서 친구들과 특별한 크리스마스 추억을 쌓아보세요.</p>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={`inner-box ${styles.meetupColumn}`}>
          <MeetupTabButtons />
          <MeetupTabPage>{props.children}</MeetupTabPage>
        </div>
      </div>
    </div>
  )
}

export default MeetupLayout
