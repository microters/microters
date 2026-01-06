// src/middleware.js
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role;

    // If trying to access admin routes and not an admin, redirect
    if (req.nextUrl.pathname.startsWith("/dashboard/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/user", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Apply middleware only to dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};