import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
)

export const userSignUp = async (
  email: string,
  password: string,
  option: object,
): Promise<void> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: option,
      },
    })

    if (error) throw error
  } catch (error) {
    console.error(error)
    throw new Error('[ERROR] 회원가입 실패')
  }
}

export const userSignIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    const accessToken = data.session.access_token
    const refreshToken = data.session.refresh_token
    const { data: settionData, error: settionError } = supabase.auth.setSession(
      {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    )

    if (settionError) throw settionError

    alert(`로그인 성공\n${data.user.email}`)
    return data.session
  } catch (error) {
    console.error(error)
    throw new Error('[ERROR] 로그인 실패')
  }
}

export const userSignOut = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    alert(`로그인 상태가 아닙니다!`)
    return
  }

  try {
    const { error } = await supabase.auth.signOut()

    if (error) throw error

    alert(`로그아웃 완료`)
  } catch (error) {
    console.log(error)
    throw new Error('[ERROR] 로그아웃 실패')
  }
}

// 공식문서에서 제공된 쿠키 세팅 코드입니다.
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
    // delete cookies on sign out
    const expires = new Date(0).toUTCString()
    document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
    document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`
  } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
    document.cookie = `my-access-token=${session?.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
    document.cookie = `my-refresh-token=${session?.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
  }
})
