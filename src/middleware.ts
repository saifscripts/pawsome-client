import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getCurrentUser } from './services/auth-services';

const AuthRoutes = [
  '/login',
  '/register',
  '/forget-password',
  '/reset-password',
];
export const RoleBasedRoutes = {
  admin: [/^\/dashboard/, '/create-post'],
  user: ['/create-post'],
};

export async function middleware(request: NextRequest) {
  const user = await getCurrentUser();

  const { pathname } = request.nextUrl;

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (
    user?.role &&
    RoleBasedRoutes[user?.role].some((route: RegExp | string) =>
      pathname.match(route)
    )
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/create-post',
    '/login',
    '/register',
    '/forget-password',
    '/reset-password',
  ],
};
