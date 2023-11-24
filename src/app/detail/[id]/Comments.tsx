import React from 'react'
import styles from './detail.module.scss'

const Comments = () => {
  return (
    <div className={styles.comments}>
      댓글
      <div>
        <p>
          성냥팔이 소녀<span>1시간 전</span>
        </p>
        <p>
          2023년 많은 사항 받은 인기팝송 총모음.. 치열한 지하철에서 크리스마스의
          즐거움을 느낄 수 있는 .. 그런 .. 희망창 플레이 리스트.. 모두 행복한..
        </p>
        <button>좋아요</button>
      </div>
    </div>
  )
}

export default Comments
