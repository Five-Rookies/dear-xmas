import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  /**
   * 1. 로그인이 되어 있지 않고
   * 2. 경로가 '/meetup' || '/live' || '/detail' 인 경우
   * -> '/signIn' 페이지로 리다이렉트
   */
  const isMeetupPage = req.nextUrl.pathname.startsWith('/meetup')
  const isLivePage = req.nextUrl.pathname.startsWith('/live')
  const isDetailPage = req.nextUrl.pathname.startsWith('/detail')
  if (!user && (isMeetupPage || isLivePage || isDetailPage)) {
    const loginUrl = new URL('/signIn', req.url)
    loginUrl.searchParams.set('login', 'false')
    return NextResponse.redirect(loginUrl)
  }

  /**
   * 1. 로그인이 되어 있고
   * 2. 경로가 '/sign*'인 경우
   * -> '/' 페이지로 리다이렉트
   */
  const isAuthPage = req.nextUrl.pathname.startsWith('/sign')
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL('/not-found', req.url))
  }

  return res
}

// 미들웨어가 적용되는 경로를 설정
export const config = {
  matcher: [
    '/',
    '/signIn/:path*',
    '/signUp',
    '/meetup/:path*',
    '/live/:path*',
    '/detail/:path*',
  ],
}
