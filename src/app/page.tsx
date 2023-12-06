import React from 'react'
import Main from '@/app/(main)/@main/page'
import MeetupList from '@/app/(main)/@meetuplist/page'
import Slot from '@/app/(main)/@slot/page'
import Survey from '@/app/(main)/@survey/page'


const Home = () => {
  return (
    <main className="main-container">
      <Main />
      <MeetupList />
      <Slot />
      <Survey />
    </main>
  )
}

export default Home
