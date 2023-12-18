'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/app/(meetUp)/meetup/meetup.module.scss'
import TabLoading from './TabLoading'

const MeetupTabPage = ({
  children,
}: {
  children: React.JSX.Element
}): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 400)
  }, [children])

  return (
    <div className={`inner-box ${styles.contents}`}>
      {isLoading ? <TabLoading /> : children}
    </div>
  )
}

export default MeetupTabPage
