import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getCurrentUser } from './services/auth.service';

const AuthRoutes = [
  '/login',
  '/register',
  '/forget-password',
  '/reset-password',
];

export const RoleBasedRoutes = {
  admin: [/^\/dashboard/],
  user: [/^\/dashboard/],
};

export async function middleware(request: NextRequest) {
  const user = await getCurrentUser();

  const { pathname } = request.nextUrl;

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
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
    '/login',
    '/register',
    '/forget-password',
    '/reset-password',
  ],
};
