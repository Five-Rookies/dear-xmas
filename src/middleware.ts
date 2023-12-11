import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // 쿠키에서 토큰을 읽어옵니다.
  const refreshToken = req.cookies.get('my-refresh-token')
  const accessToken = req.cookies.get('my-access-token')

  // 토큰이 있는 경우, Supabase 세션을 설정합니다.
  if (refreshToken && accessToken) {
    await supabase.auth.setSession({
      refresh_token: refreshToken.value,
      access_token: accessToken.value,
    })
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()
  console.log('### user ###')
  console.log(user)

  /**
   * 사용자 접근 제한 조건
   * 1. 로그인이 되어 있지 않고
   * 2. 경로가 '/meetup' || '/live' || '/detail' 인 경우
   * -> '/signIn' 페이지로 리다이렉트
   */
  const isMeetupPage = req.nextUrl.pathname.startsWith('/meetup')
  const isLivePage = req.nextUrl.pathname.startsWith('/live')
  const isDetailPage = req.nextUrl.pathname.startsWith('/detail')
  if (!user && (isMeetupPage || isLivePage || isDetailPage)) {
    return NextResponse.redirect(new URL('/signIn', req.url))
  }

  return res
}

// 이 미들웨어가 적용되는 경로를 설정
export const config = {
  matcher: ['/signIn', '/meetup/:path*', '/live/:path*', '/detail/:path*'],
}
