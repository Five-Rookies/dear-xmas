'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {
  IProfile,
  getProfile,
  updateProfile,
} from '@/utils/apiRequest/profileApiRequest'
import ISupabase from '@/type/SupabaseResponse'
import styles from './header.module.scss'

const Profile = () => {
  const [userData, setUserData] = useState<IProfile>()
  const [editMode, setEditMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const profiles = ['santa', 'snowman', 'candle', 'cookie']

  console.log(userData)
  console.log(editMode)

  const fetchData = async () => {
    const supabase = createClientComponentClient<ISupabase[]>()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const profile: IProfile[] = await getProfile('email', session!.user.email!)
    if (!profile.length) alert('오류가 발생했습니다!')

    setUserData(profile[0])
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleUserName = async () => {
    if (editMode && inputRef.current && userData) {
      const data = {
        id: userData.id,
        profileImg: userData.profile_img,
        userName: inputRef.current.value,
      }
      const res = await updateProfile(data)
      setUserData(res)
    }
    setEditMode(!editMode)
  }

  return (
    userData && (
      <div className={styles.profile}>
        <div className={styles.profileImgBox}>
          <span>
            <img src="/assets/profile-btn.svg" alt="" />
          </span>
          <img
            className={styles.myProfileImg}
            src={`/assets/profile-${profiles[userData.profile_img]}.svg`}
            alt=""
          />
          <span>
            <img src="/assets/profile-btn.svg" alt="" />
          </span>
        </div>
        <div className={styles.userInfo}>
          {editMode ? (
            <p>
              <input ref={inputRef} placeholder={userData.user_name} />
            </p>
          ) : (
            <p>{userData.user_name}</p>
          )}
          <p>{userData.email}</p>
          <p onClick={handleUserName}>닉네임 수정</p>
        </div>
      </div>
    )
  )
}

export default Profile
