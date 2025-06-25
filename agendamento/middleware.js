// middleware.js
console.log("🟡 Middleware CARREGADO");

import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.pathname;
  console.log("🔒 Middleware executado para:", url);

  const isAuth = request.cookies.get("auth")?.value === "true";

  if (url.startsWith("/admin") && !isAuth) {
    console.log("⛔ Sem autenticação, redirecionando...");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
