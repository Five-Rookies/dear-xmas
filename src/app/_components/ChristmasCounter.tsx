'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/app/page.module.scss'
import { calculateTimeUntilDays } from '@/utils/calculateTimeUntilDay'

const ChristmasCounter = () => {
  const [timeRemaining, setTimeRemaining] = useState('')
  const [dayRemaining, setDayRemaining] = useState('')
  const now = new Date()
  const year =
    now.getMonth() === 11 && now.getDate() > 25
      ? now.getFullYear() + 1
      : now.getFullYear()
  const christmas = new Date(year, 11, 25)
  useEffect(() => {
    calculateTimeUntilDays(
      'D-Day',
      christmas,
      setTimeRemaining,
      setDayRemaining,
    )

    const interval = setInterval(() => {
      calculateTimeUntilDays(
        'D-Day',
        christmas,
        setTimeRemaining,
        setDayRemaining,
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.counter}>
      <div className={styles.counterContent}>
        <h2>{dayRemaining}</h2>
        <h4>{timeRemaining}</h4>
      </div>
    </div>
  )
}

export default ChristmasCounter
