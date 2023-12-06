import React from 'react'
import styles from './meetup.module.scss'
import MeetupEventButtons from './_components/MeetupEventButtons'
import VideoList from './_components/VideoList'
import MeetupList from './_components/MeetupList'

const MeetupPage = () => {
  return (
    <div className={styles.container}>
      <h1>meetup페이지 입니다.</h1>
      <p>버튼 클릭시 해당하는 컴포넌트가 표시되도록 기능 추가해야 합니다</p>
      <MeetupEventButtons />
      <MeetupList />
      <VideoList />
    </div>
  )
}

export default MeetupPage
