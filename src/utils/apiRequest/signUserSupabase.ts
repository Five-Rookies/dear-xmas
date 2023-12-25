import React from 'react'
import { supabase } from './defaultApiSetting'

export const handleSignOut = async () => {
  const { data } = await supabase.auth.getSession()
  if (!data.session) {
    alert('로그아웃 상태입니다!')
    return
  }

  try {
    const response = await fetch('/auth/logout', {
      method: 'POST',
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error)
    }

    alert('로그아웃 완료')
    location.reload()
  } catch (error) {
    alert('로그아웃 실패\n다시 시도해 주세요!')
    console.error(error)
  }
}

export const handleSignIn = async (formData: FormData) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error)
    }

    alert('로그인 완료. 반갑습니다!')
    location.reload()
  } catch (error) {
    alert(
      '로그인 실패\n이메일이나 비밀번호가 잘못되었습니다. 다시 입력해주세요!',
    )
    throw error
  }
}

export const handleSignUp = async (formData: FormData) => {
  try {
    const response = await fetch('/auth/sign-up', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error)
    }
  } catch (error) {
    alert('회원가입 시도 중 오류가 발생하였습니다.')
    throw error
  }
}
