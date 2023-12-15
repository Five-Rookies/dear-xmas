'use client'
import React, { useEffect, useState, useRef } from 'react'
import styles from '../live.module.scss'
import ISupabase from '@/type/SupabaseResponse'
import { createChat, getChat } from '@/utils/apiRequest/liveApiRequest'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'
import useStore from '@/status/store'

const LiveChat = ({ meetupId }: { meetupId: number }) => {
  const { setTime } = useStore()
  const [chat, setChat] = useState<any>([])
  const [user, setUser] = useState<any>([])
  const inputValue = useRef<any>()
  const fetchChat = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    setUser(session?.user)
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
    let timeArray = time.split(':')
    let hours = parseInt(timeArray[0], 10)
    let minutes = parseInt(timeArray[1], 10)
    let seconds = parseInt(timeArray[2], 10)

    let totalSeconds = hours * 3600 + minutes * 60 + seconds
    return totalSeconds
  }
  const handleCreate = async (e: any) => {
    if (e.key === 'Enter') {
      await createChat(
        meetupId,
        user.user_metadata.user_name || '',
        user.id || '',
        user.user_metadata.profile_img as 0 | 1 | 2 | 3,
        inputValue?.current?.value,
      )
      inputValue.current.value = ''
    }
  }
  const handleVideoStart = (chat: string) => {
    const startIndex = chat.indexOf('#') + 1
    const time = chat.substring(startIndex, startIndex + 8)
    const seconds = timeToSeconds(time)
    setTime(seconds)
    // location.reload() // TODO: 같은 시간 선택 시 리렌더링 되지 않는 문제 해결을 위한 코드. 단 전체 새로고침이 되므로 지양해야함..
  }
  return (
    <div className={styles.liveChatContainer}>
      <div className={styles.createChat}>
        <img
          src={`/assets/profile-${
            profiles[user?.user_metadata?.profile_img]
          }.svg`}
          alt=""
        />
        <input
          type="text"
          placeholder="[#00:00:00] #을 붙여 현재 재생시간을 공유하세요"
          ref={inputValue}
          onKeyPress={handleCreate}
        />
      </div>
      <ul className={styles.liveChat}>
        {...chat?.map((liveChat: ISupabase) => {
          const { profile_img, live_content } = liveChat
          return (
            <li key={liveChat.id} className={styles.liveChatBox}>
              <img
                src={`/assets/profile-${profiles[profile_img]}.svg`}
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
