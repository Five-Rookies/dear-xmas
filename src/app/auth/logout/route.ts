import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// import type { Database } from '@/lib/database.types'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  })

  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: '[ERROR] 로그아웃 실패. supabase 통신 에러 발생' },
      { status: 500 },
    )
  }

  return NextResponse.redirect(`${requestUrl.origin}/signIn`, {
    status: 301,
  })
}
