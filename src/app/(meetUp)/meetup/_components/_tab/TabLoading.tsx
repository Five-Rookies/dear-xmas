import React from 'react'
import { BounceLoader } from 'react-spinners'
import styles from '@/app/(meetUp)/meetup/meetup.module.scss'

const Loading = () => {
  return (
    <div className={styles.tabLoading}>
      <span>로딩중</span>
      <BounceLoader className="loadig-spinner" color={'#da3017'} />
    </div>
  )
}

export default Loading
