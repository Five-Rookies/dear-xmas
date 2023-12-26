'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/app/(meetUp)/meetup/meetup.module.scss'
import TabLoading from '@/app/(meetUp)/meetup/_components/_tab/TabLoading'

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
    }, 200)
  }, [])
  return (
    <div className={styles.contents}>
      {isLoading ? <TabLoading /> : children}
    </div>
  )
}

export default MeetupTabPage
