import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
)

export const handleSignOut = async () => {
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
