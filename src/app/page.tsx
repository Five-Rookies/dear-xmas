import React from 'react'
import Main from '@/app/_components/Main'
import MeetupList from '@/app/_components/MeetupList'
import Slot from '@/app/_components/Slot'
import Survey from '@/app/_components/Survey'
import Script from 'next/script'

const Home = () => {
  return (
    <>
      <Script
        defer
        src="https://t1.kakaocdn.net/kakao_js_sdk/v1/kakao.min.js"
      />
      <main className="main-container">
        <Main />
        <MeetupList />
        <Slot />
        <Survey />
      </main>
    </>
  )
}

export default Home
