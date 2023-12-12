import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// import type { Database } from '@/lib/database.types'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const userName = String(formData.get('user_name'))
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const passwordHint = String(formData.get('password_hint'))
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  })

  const option = {
    user_name: userName,
    password_hint: passwordHint,
    profile_img: 0,
  }

  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: option,
        emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      },
    })
    if (error) throw error
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: '[ERROR] 회원가입불가. 서버 통신 에러 발생' },
      { status: 500 },
    )
  }

  console.log(requestUrl.origin)
  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  })
}

export default POST
