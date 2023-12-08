'use client'
import React, { useEffect, useState, useRef } from 'react'
import styles from '../live.module.scss'
import ISupabase from '@/type/SupabaseResponse'
import { createChat, supabase } from '@/utils/apiRequest/commentsApiRequest'
import { RealtimePostgresInsertPayload } from '@supabase/supabase-js'

const LiveChat = ({
  chatData,
  user,
  meetupId,
}: {
  chatData: ISupabase[]
  user: ISupabase
  meetupId: string
}) => {
  const [chat, setChat] = useState<ISupabase[]>([...chatData])
  const inputValue = useRef()

  useEffect(() => {
    const checkInsertLive = supabase
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'live_chat',
        },

        (payload: any) => setChat([...chat, payload.new]),
      )
      .subscribe()

    return () => {
      supabase.removeChannel(checkInsertLive)
    }
  }, [supabase, chat, setChat])

  const profiles = ['santa', 'snowman', 'candle', 'cookie']

  const handleCreate = async (e: any) => {
    if (e.key === 'Enter') {
      await createChat(
        meetupId,
        user.user_name || '',
        user.user_id || '',
        user.profile_img,
        inputValue?.current?.value,
      )
      inputValue.current.value = ''
    }
  }

  return (
    <div className={styles.liveChatContainer}>
      <div className={styles.createChat}>
        <img src={`/assets/profile-${profiles[user.profile_img]}.svg`} alt="" />
        <input
          type="text"
          placeholder="하고싶은 말을 입력해보세요."
          ref={inputValue}
          onKeyPress={handleCreate}
        />
      </div>
      <ul className={styles.liveChat}>
        {[...chat]
          .sort((a, b) => b.id - a.id)
          ?.map((liveChat: ISupabase) => {
            return (
              <li key={liveChat.id} className={styles.liveChatBox}>
                <img
                  src={`/assets/profile-${profiles[liveChat.profile_img]}.svg`}
                  alt=""
                />
                <span className={styles.userName}> {liveChat.user_name}</span>
                <span> {liveChat.live_content}</span>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default LiveChat
