'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import styles from './header.module.scss'
import { Session } from 'inspector'
import { updateUser } from '@/utils/apiRequest/signUserSupabase'
import ISupabase from '@/type/SupabaseResponse'

const Profile = () => {
  const [userData, setUserData] = useState<any>({})
  const [editMode, setEditMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const profiles = ['santa', 'snowman', 'candle', 'cookie']
  const fetchData = async () => {
    const supabase = createClientComponentClient<ISupabase[]>()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    setUserData(session?.user)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const handleUserName = async () => {
    if (editMode) {
      const data = {
        userName: inputRef?.current?.value,
        userId: userData?.id,
      }
      const res = await updateUser(data)
      // setUserData(res)
      return
    }
    setEditMode(!editMode)
  }
  return (
    userData && (
      <div className={styles.profile}>
        <div className={styles.profileImgBox}>
          {/* <span>
            <img src="/assets/profile-btn.svg" alt="" />
          </span> */}
          <img
            className={styles.myProfileImg}
            src={`/assets/profile-${
              profiles[userData?.user_metadata?.profile_img]
            }.svg`}
            alt=""
          />
          {/* <span>
            <img src="/assets/profile-btn.svg" alt="" />
          </span> */}
        </div>
        <div className={styles.userInfo}>
          {editMode ? (
            <p>
              <input
                ref={inputRef}
                placeholder={userData?.user_metadata?.user_name}
              />
            </p>
          ) : (
            <p>{userData?.user_metadata?.user_name}</p>
          )}
          <p>{userData?.email}</p>
          {/* <p onClick={e => handleUserName()}>닉네임 수정</p> */}
        </div>
      </div>
    )
  )
}

export default Profile
