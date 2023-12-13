import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

const handleSignOut = async () => {
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
  } catch (error) {
    alert('[ERROR]\n로그아웃 실패\n다시 시도해 주세요!')
    console.error(error)
  }
}

export default handleSignOut
