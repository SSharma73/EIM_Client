import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });
  // ** Protecret Routes
  const ProtectedRoutes = ["/", "/dashboard"];
  if (token === null && ProtectedRoutes?.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (token !== null && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
