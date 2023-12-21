import React from 'react'
import styles from './sign.module.scss'

interface IBasicInputProps {
  title: string
  name: string
  type: string
  placeholder: string
  inputRef?: React.RefObject<HTMLInputElement>
}

export const BasicInput = ({
  title,
  name,
  type,
  placeholder,
  inputRef,
}: IBasicInputProps) => {
  return (
    <div className={styles.inputField}>
      <h3>{title}</h3>
      <input
        ref={inputRef}
        name={name}
        type={type}
        placeholder={placeholder}
        required
      />
    </div>
  )
}

const errorMessages: { [key: string]: string } = {
  password: '영어,숫자,특수문자 포함 8~15 글자로 입력해주세요',
  passwordHint: '비밀번호 확인이 일치하지 않습니다',
}

export const PasswordInput = ({
  passwordRef,
}: {
  passwordRef: React.RefObject<HTMLInputElement>
}) => {
  return (
    <div className={styles.inputField}>
      <h3>비밀번호</h3>
      <input
        ref={passwordRef}
        name="password"
        type="password"
        placeholder="영어,숫자,특수문자 포함 8~15 글자를 입력해주세요"
        minLength={8}
        maxLength={15}
        pattern="(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#\$%\^*+=\-]).*"
        required
        onInvalid={e => {
          const inputElement = e.currentTarget as HTMLInputElement
          if (inputElement.validity.patternMismatch)
            inputElement.setCustomValidity(errorMessages.password)
        }}
        onInput={e => e.currentTarget.setCustomValidity('')}
      />
      <p>특수문자는 다음 문자들만 입력 가능합니다 : !@#$%^*+=- </p>
    </div>
  )
}

export const PasswordCheckInput = ({
  passwordRef,
}: {
  passwordRef: React.RefObject<HTMLInputElement>
}) => {
  return (
    <div className={styles.inputField}>
      <h3>비밀번호 확인</h3>
      <input
        type="password"
        placeholder="비밀번호를 한번 더 입력해주세요"
        required
        onChange={e =>
          e.currentTarget.setCustomValidity(
            passwordRef.current?.value !== e.currentTarget.value
              ? errorMessages.passwordHint
              : '',
          )
        }
      />
    </div>
  )
}

export const PasswordHintInput = ({
  passwordHintRef,
}: {
  passwordHintRef?: React.RefObject<HTMLInputElement>
}) => {
  return (
    <div className={styles.inputField}>
      <h3>비밀번호 찾기 힌트</h3>
      <input
        ref={passwordHintRef}
        name="password_hint"
        type="text"
        placeholder="크리스마스에 받았던 가장 좋은 선물은 무엇이었나요?"
        required
      />
    </div>
  )
}
