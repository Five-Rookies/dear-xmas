'use server'

import React from 'react'
import MyMeetupList from '../_components/MyMeetupList'

const page = async (): Promise<React.JSX.Element> => {
  return <MyMeetupList />
}

export default page
