import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useGoods } from './app/_store/useGoods';

export function middleware(request: NextRequest) {

  const { nextUrl, cookies } = request;
  const { origin, pathname } = nextUrl;
  const accessToken = cookies.get("accessToken") || '';


  let isLoginFlag = false;

  if (accessToken) {
    let jwtPayload
    try{
      jwtPayload = JSON.parse(atob(accessToken.value.split('.')[1]))
    } catch (e) {
      isLoginFlag = false
      return;
    }
    
    const exp = jwtPayload.exp
    const data = jwtPayload.data
    const now = new Date().getTime() / 1000
    if (now > exp) {
      isLoginFlag = false

    } else {
      isLoginFlag = true


    }
  } else {
    isLoginFlag = false

  }
  const GUEST_PAGES = ['/auth'];
  const USER_PAGES = ['/market/new', '/market/edit', '/my', '/profile/edit', "/notify", "/chat"];
  // console.log(pathname);
  const url = request.nextUrl.clone()

  if (GUEST_PAGES.some(page => pathname.startsWith(page))) {
    if (isLoginFlag) {
      url.pathname = '/'
      return NextResponse.redirect(url)
    } else {
      return NextResponse.next()
    }

  } else if (USER_PAGES.some(page => pathname.startsWith(page))) {
    if (!isLoginFlag) {
      url.pathname = '/auth'
      return NextResponse.redirect(url)
    } else {
      return NextResponse.next()
    }
  }

}

