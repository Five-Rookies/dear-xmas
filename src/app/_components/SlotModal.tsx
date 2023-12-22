'use client'

import React, { useState, useEffect } from 'react'
import styles from '@/app/page.module.scss'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'

declare global {
  interface Window {
    Kakao: any
  }
}
const SlotModal = ({ handleModalClose, sentence }: any) => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY)
    }
    // 모달이 열릴 때 body의 overflow를 hidden으로 설정
    document.body.style.overflow = 'hidden'
    return () => {
      // 모달이 닫힐 때 body의 overflow를 초기 상태로 복원
      document.body.style.overflow = 'auto'
    }
  }, [])
  const getUserName = async (): Promise<void> => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (!user) {
        throw error
      }
      return user?.user_metadata.user_name
    } catch (error) {
      alert('로그인 후 사용해주세요')
    }
  }
  const handleShare = async () => {
    const userName = await getUserName()
    try {
      if (userName !== undefined) {
        window.Kakao.Share.sendCustom({
          templateId: 102052,
          templateArgs: {
            tester: userName,
            result: sentence.join(' '),
          },
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className={styles.slotModal} onClick={handleModalClose}>
        <div className={styles.modalContent}>
          <div className={styles.textArea}>
            <p>이번 크리스마스는</p>
            <p>{sentence.join(' ')}</p> {/* 재 조합된 문장 표시 */}
          </div>
          <div className={styles.btnGroup}>
            <button id="kakaotalk-sharing-btn" onClick={() => handleShare()}>
              카카오톡 공유
            </button>

            <button onClick={handleModalClose}>그만 보기</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SlotModal
