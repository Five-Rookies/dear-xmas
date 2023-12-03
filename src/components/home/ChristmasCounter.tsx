'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/app/page.module.scss'

const ChristmasCounter = () => {
  const [timeRemaining, setTimeRemaining] = useState('')
  const [dayRemaining, setDayRemaining] = useState('')

  useEffect(() => {
    const calculateTimeUntilChristmas = () => {
      const now = new Date()
      const christmas = new Date(now.getFullYear(), 11, 25)
      if (now.getMonth() === 11 && now.getDate() > 25) {
        // 12월이면서 25일이 지났으면 년도를 1년 추가
        christmas.setFullYear(christmas.getFullYear() + 1)
      }
      const difference = christmas.getTime() - now.getTime()
      // 현재 시간과 크리스마스까지의 시간 차이를 밀리초 단위로 구별
      if (difference <= 0) {
        //  크리스마스까지의 시간 차이가 0 이하인지 확인 즉 크리스마스 이후인 경우.
        return setTimeRemaining('D-Day')
      }
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setDayRemaining(`D-${days}`)
      setTimeRemaining(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
      )
    }
    const interval = setInterval(calculateTimeUntilChristmas, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.counter}>
      <h2>{dayRemaining}</h2>
      <h4>{timeRemaining}</h4>
    </div>
  )
}

export default ChristmasCounter
