import React from 'react'
import styles from './sign.module.scss'

const page = () => {
  return (
    <main className={styles.container}>
      <h1>회원가입</h1>
      <form>
        <div className="input-field">
          <h3>닉네임</h3>
          <input
            type="text"
            placeholder="특수문자 제외 8글자 이하로 입력해주세요"
          />
        </div>
        <div className="input-field">
          <h3>아이디</h3>
          <input type="text" placeholder="이메일을 입력해주세요" />
        </div>
        <div className="input-field">
          <h3>비밀번호</h3>
          <input
            type="text"
            placeholder="영어,숫자,특수문자 포함 8~15 글자 입력해주세요"
          />
        </div>
        <div className="input-field">
          <h3>비밀번호 확인</h3>
          <input type="text" placeholder="비밀번호를 한번 더 입력해주세요" />
        </div>
        <div className="input-field">
          <h3>비밀번호 찾기 힌트</h3>
          <input
            type="text"
            placeholder="크리스마스에 받았던 가장 좋은 선물은 무엇이었나요?"
          />
        </div>

        <button type="submit">회원가입</button>
        <span>@Copyright 2023. Five Rookies All rights reserved.</span>
      </form>
    </main>
  )
}

export default page
