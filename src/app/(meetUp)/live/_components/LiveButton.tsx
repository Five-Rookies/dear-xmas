'use client'

import React, { useEffect, useState } from 'react'
import styles from '../live.module.scss'
import { calculateTimeUntilDays } from '@/utils/calculateTimeUntilDay'
import { useRouter } from 'next/navigation'
import { deleteLive } from '@/utils/apiRequest/liveApiRequest'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'

const LiveButton = ({
  leader,
  scheduling,
  currentMeetupId,
}: {
  leader: string
  scheduling: string
  currentMeetupId: string
}) => {
  const router = useRouter()
  const [isEnd, setIsEnd] = useState<any>(false)
  const [dayRemaining, setDayRemaining] = useState('')
  const [timeRemaining, setTimeRemaining] = useState('')
  const [userName, setUserName] = useState<any>([])
  const meetupTime = new Date(scheduling)
  const isLeader = leader === userName
  const isNotEnded = dayRemaining !== '종료하기'

  useEffect(() => {
    const checkDeleteLive = supabase
      .channel('meetup-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'meetup_board',
        },
        () => isDeleteMeetup(),
      )
      .subscribe()

    return () => {
      supabase.removeChannel(checkDeleteLive)
    }
  }, [isEnd])

  useEffect(() => {
    fetchUser()
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

  const fetchUser = async () => {
    const { data } = await supabase.auth.getSession()
    setUserName(data.session?.user.user_metadata.user_name)
  }

  const isDeleteMeetup = () => {
    router.refresh()
    router.push('/meetup')
  }

  const handleDeleteLive = async (e: any) => {
    if (e.target.textContent === '종료하기') {
      if (window.confirm('종료하시겠습니까?')) {
        setIsEnd(!isEnd)
        await deleteLive(currentMeetupId)
        isDeleteMeetup()
      }
    }
  }

  return isLeader ? (
    <button
      onClick={handleDeleteLive}
      className={isNotEnded ? styles.liveDelayBtn : styles.liveEndBtn}
    >
      {isNotEnded ? `재생까지 ${dayRemaining} ${timeRemaining}` : dayRemaining}
    </button>
  ) : (
    isNotEnded && (
      <button onClick={handleDeleteLive} className={styles.liveDelayBtn}>
        {`재생까지 ${dayRemaining} ${timeRemaining}`}
      </button>
    )
  )
}

export default LiveButton
