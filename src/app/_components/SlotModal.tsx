'use client'

import React, { useState, useEffect } from 'react'
import styles from '@/app/page.module.scss'

const SlotModal = ({ handleModalClose, sentence }: any) => {
  useEffect(() => {
    // 모달이 열릴 때 body의 overflow를 hidden으로 설정
    document.body.style.overflow = 'hidden'

    return () => {
      // 모달이 닫힐 때 body의 overflow를 초기 상태로 복원
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className={styles.slotModal} onClick={handleModalClose}>
      <div className={styles.modalContent}>
        <div className={styles.textArea}>
          <p>이번 크리스마스는</p>
          <p>{sentence}</p> {/* 재 조합된 문장 표시 */}
        </div>
        <div className={styles.btnGroup}>
          <button>카카오톡 공유</button>
          <button onClick={handleModalClose}>그만 보기</button>
        </div>
      </div>
    </div>
  )
}

export default SlotModal
