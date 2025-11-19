import { NextResponse, type NextRequest } from "next/server";

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, "") ?? "https://oz-withpet.kro.kr";
const ACCESS_COOKIE = "access_token";
const REFRESH_COOKIE = "refresh_token";
const REFRESH_ENDPOINT = "/auth/token/refresh";
const LOGIN_PATH = "/login";
const PUBLIC_PATHS = ["/login", "/signup", "/map"];

const isPublicPath = (pathname: string) => {
  if (pathname === "/") return true;
  return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
};

const requestRefresh = async (refreshToken: string) => {
  const response = await fetch(`${BACKEND_BASE_URL}${REFRESH_ENDPOINT}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("refresh failed");
  }

  const data = (await response.json()) as { access?: string };
  if (!data.access) {
    throw new Error("no access token");
  }
  return data.access;
};

const redirectToLogin = (request: NextRequest) =>
  NextResponse.redirect(new URL(LOGIN_PATH, request.url));

export async function middleware(request: NextRequest) {
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
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
