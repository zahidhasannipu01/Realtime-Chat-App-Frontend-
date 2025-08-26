import { NextResponse } from "next/server";

export const middleware = (req) => {
  const token = req.cookies.get("token")?.value || null;
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/", "/chat/:path*", "/profile/:path*"],
};
