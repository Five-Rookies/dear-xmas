'use server'

import React from 'react'
import LiveStream from './_components/LiveStream'
import styles from './live.module.scss'
import DetailHeader from '../detail/[id]/_components/DetailHeader'
import dynamic from 'next/dynamic'
import LiveButton from './_components/LiveButton'
import { getLive } from '@/utils/apiRequest/liveApiRequest'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

const ComponentsWithNoSSR = dynamic<{ meetupId: string }>(
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

  // const meetupData = await getLive(currentMeetupId)
  return (
    <div className="inner-box">
      <div className={styles.container}>
        <DetailHeader title="라이브 스트리밍" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>{meetupData?.data?.meetup_title}</h1>
          <LiveButton
            leader={meetupData.data.user_name}
            scheduling={meetupData.data.scheduling}
            currentMeetupId={currentMeetupId}
          />
        </div>

        <div className={styles.liveBox}>
          <LiveStream
            scheduling={meetupData.data.scheduling}
            thumbnail={meetupData.data.thumbnail}
            videoId={meetupData.data.video_id}
          />
          <ComponentsWithNoSSR meetupId={currentMeetupId} />
        </div>
      </div>
    </div>
  )
}
export default LivePage
