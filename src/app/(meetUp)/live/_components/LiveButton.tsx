'use client'

import React, { useEffect, useState } from 'react'
import styles from '../live.module.scss'
import { calculateTimeUntilDays } from '@/utils/calculateTimeUntilDay'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'
import { useRouter } from 'next/navigation'
import { deleteLive } from '@/utils/apiRequest/liveApiRequest'
const LiveButton = ({
  scheduling,
  currentMeetupId,
}: {
  scheduling: string
  currentMeetupId: string
}) => {
  const router = useRouter()
  const [dayRemaining, setDayRemaining] = useState('')
  const [timeRemaining, setTimeRemaining] = useState('')
  const meetupTime = new Date(scheduling)
  useEffect(() => {
    calculateTimeUntilDays(
      '종료하기',
      meetupTime,
      setTimeRemaining,
      setDayRemaining,
    )

    const interval = setInterval(() => {
      calculateTimeUntilDays(
        '종료하기',
        meetupTime,
        setTimeRemaining,
        setDayRemaining,
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  const handleDeleteLive = async (e: any) => {
    if (e.target.textContent === '종료하기') {
      deleteLive(currentMeetupId)
      alert('촛불 모임이 종료되었습니다')
      // router.push('/meetup')
    }
  }
  return (
    <button
      onClick={handleDeleteLive}
      className={
        dayRemaining !== '종료하기' ? styles.liveDelayBtn : styles.liveEndBtn
      }
    >
      {dayRemaining !== '종료하기'
        ? `재생까지 ${dayRemaining}  ${timeRemaining}`
        : dayRemaining}
    </button>
  )
}

export default LiveButton
