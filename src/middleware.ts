import { NextResponse, type NextRequest } from "next/server";

import { post } from "./shared/api/serverFetcher";

const ACCESS_COOKIE = "access_token";
const REFRESH_COOKIE = "refresh_token";
const LOGIN_PATH = "/login";
const PUBLIC_PATHS = ["/login", "/signup", "/map"];

const isPublicPath = (pathname: string) => {
  if (pathname === "/") return true;
  return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
};

const requestRefresh = async (refreshToken: string) => {
  const data = await post<{ access?: string }>(
    "/auth/token/refresh",
    { refresh_token: refreshToken },
    {
      auth: "public",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    },
  );

  if (!data?.access) {
    throw new Error("no access token");
  }
  return data.access;
};

const redirectToLogin = (request: NextRequest) =>
  NextResponse.redirect(new URL(LOGIN_PATH, request.url));

export async function middleware(request: NextRequest) {
  //console.log(request);

  if (isPublicPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value ?? null;
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value ?? null;

  if (accessToken) {
    return NextResponse.next();
  }

  if (!refreshToken) {
    return redirectToLogin(request);
  }

  try {
    const newAccessToken = await requestRefresh(refreshToken);
    const response = NextResponse.next();

    response.cookies.set({
      name: ACCESS_COOKIE,
      value: newAccessToken,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } catch (error) {
    console.warn("access refresh failed", error);
    const response = redirectToLogin(request);
    response.cookies.delete(ACCESS_COOKIE);
    response.cookies.delete(REFRESH_COOKIE);
    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
