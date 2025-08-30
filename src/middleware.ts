import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value; // Or "next-auth.session-token" if using NextAuth

  // Public routes (accessible without login)
  const publicRoutes = [
    "/login",
    "/signup",
    "/forgotPassword",
    "/resetPassword",
    "/verifyemail",
  ];

  // If user is logged in and tries to access login/signup → redirect to profile
  if (token && (pathname.startsWith("/login") || pathname.startsWith("/signup"))) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // If route is protected and user is not logged in → redirect to login
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Apply middleware only on these paths
export const config = {
  matcher: [
    "/profile/:path*",
    "/upload/:path*",
    "/testing/:path*",
    "/login",
    "/signup",
  ],
};
