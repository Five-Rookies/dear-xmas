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
  const [currentImg, setCurrentImg] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const profileImages = ['santa', 'snowman', 'candle', 'cookie']
  console.log(`프로필 이미지: ${currentImg}`)

  const fetchData = async () => {
    const supabase = createClientComponentClient<ISupabase[]>()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const profile: IProfile[] = await getProfile('email', session!.user.email!)
    if (!profile.length) alert('오류가 발생했습니다!')

    setUserData(profile[0])
    setCurrentImg(profile[0].profile_img)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleUserName = async () => {
    if (editMode && inputRef.current && userData) {
      const REGEX = /^[a-zA-Z가-힣0-9]{1,8}$/
      if (!REGEX.test(inputRef.current.value)) {
        alert('닉네임을 특수문자 제외 8글자 이하로 입력해주세요')
        return
      }
      const data = {
        id: userData.id,
        profileImg: currentImg,
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
          <button
            type="button"
            onClick={() => setCurrentImg(prev => (prev === 0 ? 3 : prev - 1))}
          >
            <img src="/assets/profile-btn.svg" alt="" />
          </button>
          <img
            className={styles.myProfileImg}
            src={`/assets/profile-${profileImages[currentImg]}.svg`}
            alt=""
          />
          <button
            type="button"
            onClick={() => setCurrentImg(prev => (prev === 3 ? 0 : prev + 1))}
          >
            <img src="/assets/profile-btn.svg" alt="" />
          </button>
        </div>
        <div className={styles.userInfo}>
          {userData && editMode ? (
            <p>
              <input ref={inputRef} placeholder={userData.user_name} />
            </p>
          ) : (
            <p>{userData.user_name}</p>
          )}
          <p>{userData.email}</p>
          <p onClick={handleUserName}>프로필 수정</p>
        </div>
      </div>
    )
  )
}

export default Profile
