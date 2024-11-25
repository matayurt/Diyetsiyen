// middleware.js
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Login sayfasına özel kontrol
    if (request.nextUrl.pathname === "/admin") {
      const token = request.cookies.get("admin_token")?.value;
      if (token) {
        const payload = await verifyToken(token);
        if (payload) {
          return NextResponse.redirect(
            new URL("/admin/dashboard", request.url)
          );
        }
      }
      return NextResponse.next();
    }

    // Diğer admin sayfaları için kontrol
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
