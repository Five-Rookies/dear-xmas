'use client'

import React, { useState, useEffect, useRef } from 'react'
import styles from '@/app/page.module.scss'
import SlotModal from './SlotModal'

const SlotContent = () => {
  const [sentence, setSentence] = useState(['2023', '크리스마스날', '당신의', '운명은?'])
const [isClicked, setIsClicked] = useState(false)
const [isRestarted, setIsRestarted] = useState(false)
const [isModalOpen, setIsModalOpen] = useState(false)
const [currentIndex, setCurrentIndex] = useState(0)
const [buttonText, setButtonText] = useState('start')
const wordRef = useRef<null>(null)

const places = ['남산타워에서', '놀이공원에서', '한강에서', 'pc방에서', '뷔페에서', '터널에서', '덕수궁 돌담길에서', '경복궁에서', '운동장에서', '산 정상에서', '서점에서', '아웃백에서', '스타벅스에서', '북촌한옥마을에서', '화장실에서', '안방에서', '아파트 옥상에서', '우리집에서']
const times = ['하루종일', '아침부터', '자기 전에', '대낮에', '새벽에', '할일없이', '눈 뜨자마자', '밤낮 없이', '잘 때만 빼고', '심심할 때', '쉬엄쉬엄', '계속', '자지도 않고']
const adjectives = ['행복하게', '혼자서', '엄마랑', '애인이랑', '친구랑', '쓸쓸하게', '박장대소하면서', '남사친이랑', '여사친이랑', '아빠랑', '처량하게', '웃으면서', '미친듯이', '배고프게', '말없이', '기쁘게', '남 몰래', '우울하게', '느긋하게', '조용하게', '신나게']
const activities = ['고백한다', '춤춘다', '포옹한다', '멍 때린다', '커피 마신다', '손잡는다', '꿀잠 잔다', '인생샷 남긴다', '차인다', '노래 부른다', '박수친다', '라면 끓여먹는다', '밤샌다', '치킨 먹는다', '일만 한다', '돈을 줍는다', 'TV 본다', '술 마신다', '운전한다', '돈만 쓴다', '먹고 자고 논다', '논다', '핸드폰한다', '틱톡 찍는다']

useEffect(() => {
  if (isClicked) {
  const interval = setInterval(() => {
  setCurrentIndex((prevIndex) => (prevIndex + 1) % places.length)
  }, 100)

    return () => {
      clearInterval(interval)
    }
  }
  }, [isClicked])

  const handleClick = (index) => {
  if (!isClicked) {
  setIsClicked(true)
  handleMakeSentence()
  setButtonText('restart')
  setCurrentIndex(0)
  setIsRestarted(false)

    setTimeout(() => {
      setIsModalOpen(true)
    }, 800)
  } else {
    setIsClicked(false)
    setIsModalOpen(false)
    setButtonText('start')
    setCurrentIndex(0)
    setIsRestarted(true)
  }
}

// const handleAnimation = (index: number, isClicked: string) => {
//   if (isClicked) {
//     return `${styles.spin} ${styles[`spin--ani-${index + 1}`]}`
//   } else {
//     return styles.spin
//   }
// }


const handleRestart = () => {
setCurrentIndex(0) // 재시작 시 currentIndex 초기화
}

const handleModalClose = () => {
setIsModalOpen(false)
setIsClicked(false)
}

const handleMakeSentence = () => {
const randomPlace = places[Math.floor(Math.random() * places.length)]
const randomTime = times[Math.floor(Math.random() * times.length)]
const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
const randomActivity = activities[Math.floor(Math.random() * activities.length)]

const generatedSentence = [randomPlace, randomTime, randomAdjective, randomActivity]
setSentence(generatedSentence)
}

return (
  <div className={styles.slotContent}>
    <button
      className={styles.joyStick}
      onClick={() => {
        setTimeout(() => {
          handleClick()
          handleModalClose() // 모달 창 닫기 함수 호출
        }, 3750) // 애니메이션의 지속 시간만큼 지연하여 handleClick 함수 호출
      }}
      disabled={isClicked}
    >
      <span>{buttonText}</span>
      <div />
    </button>
    {isModalOpen && (
      <SlotModal
        onClose={handleModalClose}
        handleModalClose={handleModalClose}
        handleMakeSentence={handleMakeSentence}
        sentence={sentence}
        isRestarted={isClicked}
      />
    )}
    <div className={styles.slotBox}>
      <div className={styles.imgArea}>
        <figure className={styles.slotArrow}>
          <img src="/assets/slot-arrow.png" alt="" />
        </figure>
        <figure className={styles.slotSanta}>
          <img src="/assets/slot-santa.png" alt="" />
        </figure>
      </div>
      <ul className={styles.slotMachine}>
        {sentence.map((word, index) => (
          <li key={index} className={styles.slotAnimation}>
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`${styles.spin} ${styles[`spin--ani-${index + 1}`]}`}
                ref={wordRef}
              >
                {word}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  </div>
)

}

export default SlotContent
