'use server'

import React from 'react'
import MeetupList from '../_components/MeetupList'

const page = async (): Promise<React.JSX.Element> => {
  return <MeetupList />
}

export default page
