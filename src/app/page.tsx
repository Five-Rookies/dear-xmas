import React from 'react'
import Main from '@/app/_components/Main'
import MeetupList from '@/app/_components/MeetupList'
import Slot from '@/app/_components/Slot'
import Survey from '@/app/_components/Survey'

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
