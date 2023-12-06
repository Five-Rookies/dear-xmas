import React from 'react'
import LiveStream from './_components/LiveStream'
import LiveChat from './_components/LiveChat'
import styles from './live.module.scss'

const LivePage = () => {
  return (
    <div className={styles.container}>
      LivePage 입니다
      <LiveStream />
      <LiveChat />
    </div>
  )
}

export default LivePage
