'use client'

import React, { useEffect, useState, useRef } from 'react'
import { createChat, getChat } from '@/utils/apiRequest/liveApiRequest'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'
import useStore from '@/status/store'
import { debounce } from 'lodash'
import { TLiveChat, TProfiles } from '@/type/SupabaseResponse'
import styles from '../live.module.scss'
import { getProfileByEmail } from '@/utils/apiRequest/profileApiRequest'

const LiveChat = ({ meetupId }: { meetupId: number }) => {
  const { setTime } = useStore()
  const [user, setUser] = useState<any>([])
  const [chat, setChat] = useState<TLiveChat[]>([])
  const inputValue = useRef<HTMLInputElement>(null)
  const fetchChat = async () => {
    const userData: TProfiles = await getProfileByEmail()
    setUser(userData)
    const chatData = await getChat(meetupId)
    if (chatData) {
      setChat(chatData)
    }
  }

  useEffect(() => {
    fetchChat()
  }, [])

  useEffect(() => {
    const checkInsertLive = supabase
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'live_chat',
        },
        () => fetchChat(),
      )
      .subscribe()

    return () => {
      supabase.removeChannel(checkInsertLive)
    }
  }, [chat])

  const profiles = ['santa', 'snowman', 'candle', 'cookie']
  const timeToSeconds = (time: string) => {
    const timeArray = time.split(':')
    const hours = parseInt(timeArray[0], 10)
    const minutes = parseInt(timeArray[1], 10)
    const seconds = parseInt(timeArray[2], 10)

    const totalSeconds = hours * 3600 + minutes * 60 + seconds
    return totalSeconds
  }
  const handleCreate = debounce(
    async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
      if (e.key === 'Enter') {
        await createChat(
          meetupId,
          user.user_name || '',
          user.id || '',
          user.profile_img as 0 | 1 | 2 | 3,
          inputValue.current!.value,
        )
        inputValue.current!.value = ''
      }
    },
    500,
  )

  const handleVideoStart = (chatTime: string) => {
    const startIndex = chatTime.indexOf('#') + 1
    const time = chatTime.substring(startIndex, startIndex + 8)
    const seconds = timeToSeconds(time)
    setTime(seconds)
  }

  return (
    <div className={styles.liveChatContainer}>
      <div className={styles.createChat}>
        <img src={`/assets/profile-${profiles[user.profile_img]}.svg`} alt="" />
        <input
          type="text"
          placeholder="[#00:00:00] #을 붙여 현재 재생시간을 공유하세요"
          ref={inputValue}
          onKeyDown={handleCreate}
        />
      </div>
      <ul className={styles.liveChat}>
        {...chat?.map((liveChat: TLiveChat) => {
          const { profile_img, live_content } = liveChat
          return (
            <li key={liveChat.id} className={styles.liveChatBox}>
              <img
                src={`/assets/profile-${profiles[profile_img!]}.svg`}
                alt=""
              />
              <span className={styles.userName}> {liveChat.user_name}</span>
              {live_content?.includes('#') ? (
                <button
                  className={styles.startTime}
                  onClick={() => handleVideoStart(live_content)}
                  type="button"
                >
                  {live_content.split('#').join('')}
                </button>
              ) : (
                <span> {live_content}</span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default LiveChat
