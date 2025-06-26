import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.pathname;
  const isAuth = request.cookies.get("auth")?.value === "true";

  if (url.startsWith("/admin") && !isAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
