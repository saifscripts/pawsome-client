import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const AuthRoutes = ['/login', '/register'];
const RoleBasedRoutes = {
  admin: [/^\/dashboard/],
  user: [/^\/profile/],
};

type IUserRole = keyof typeof RoleBasedRoutes;

export function middleware(request: NextRequest) {
  const user:
    | {
        name: string;
        role: IUserRole;
      }
    | undefined = undefined;

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
    RoleBasedRoutes[user?.role].some((route: RegExp) => route.test(pathname))
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile/:path*', '/dashboard/:path*', '/login', '/register'],
};
