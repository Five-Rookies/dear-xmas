'use server'

import React from 'react'
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { IMeetupBoardData } from '@/type/Component'
import LiveButton from './_components/LiveButton'
import DetailHeader from '../detail/[id]/_components/DetailHeader'
import styles from './live.module.scss'
import LiveStream from './_components/LiveStream'

const ComponentsWithNoSSR = dynamic<{ meetupId: number }>(
  () => import('./_components/LiveChat'), // Component로 사용할 항목을 import합니다.
  { ssr: false },
)
const LivePage = async (param: any) => {
  const currentMeetupId = param.searchParams.meetup_id

  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })
  const meetupData = await supabase
    .from('meetup_board')
    .select('*')
    .eq('id', currentMeetupId)
    .single()
  revalidatePath('/')

  const {
    email,
    meetup_title,
    user_name,
    scheduling,
    thumbnail,
    video_id,
  }: IMeetupBoardData = meetupData?.data
  return (
    <div className="inner-box">
      <div className={styles.container}>
        <DetailHeader title="라이브 스트리밍" back="live" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>{meetup_title}</h1>
          <LiveButton
            email={email}
            user_name={user_name}
            scheduling={scheduling}
            meetup_id={currentMeetupId}
          />
        </div>

        <div className={styles.liveBox}>
          <LiveStream
            email={email}
            scheduling={scheduling}
            thumbnail={thumbnail}
            video_id={video_id}
          />
          <ComponentsWithNoSSR meetupId={currentMeetupId} />
        </div>
      </div>
    </div>
  )
}
export default LivePage
