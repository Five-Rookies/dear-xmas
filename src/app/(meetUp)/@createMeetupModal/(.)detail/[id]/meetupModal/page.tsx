'use server'

import React from 'react'
import MeetupModal from '@/app/(meetUp)/_components/_meetupModal/_meetupModal/MeetupModal'
import { IVideoInfoToCookie, getVideoInfoToCookie } from '@/utils/cookieServer'

const page = (): React.ReactNode => {
  const currentVideoInfo: IVideoInfoToCookie | null = getVideoInfoToCookie()

  return (
    <MeetupModal
      currentVideoInfo={currentVideoInfo ? currentVideoInfo : null}
    />
  )
}

export default page
