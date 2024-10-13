import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const signInPage = '/login';

export function middleware(req: NextRequest) {
  const { pathname, search, origin, basePath } = req.nextUrl;
  const cookieKey: any = 'accessToken';

  if (req.cookies.has(cookieKey)) {
    return NextResponse.next();
  }

  const signInUrl = new URL(
    `${basePath}${signInPage}?redirect=${pathname}`,
    origin
  );

  const redirectResponse = NextResponse.redirect(signInUrl);
  // https://juejin.cn/post/7342796912716595210
  // TODO:解决登陆后，踩坑 nextjs 的 middleware 没有读取到设置后的 cookie
  redirectResponse.headers.set('x-middleware-cache', 'no-cache'); // ! FIX: Disable caching
  return redirectResponse;
}

export const config = {
  matcher: ['/dashboard/:path*', '/user/:path*'],
};
