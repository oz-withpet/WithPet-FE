import { NextResponse, type NextRequest } from "next/server";

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, "") ?? "https://oz-withpet.kro.kr";

const ACCESS_COOKIE = "access_token";
const REFRESH_COOKIE = "refresh_token";

const REFRESH_ENDPOINT = "/auth/token/refresh";

const isTokenExpired = (token?: string | null) => {
  if (!token) return true;
  try {
    const [, payload] = token.split(".");
    if (!payload) return true;

    const decoded = JSON.parse(Buffer.from(payload, "base64").toString());
    if (!decoded?.exp) return false;
    const expiresAt = decoded.exp * 1000;

    return Date.now() >= expiresAt - 1000;
  } catch {
    return true;
  }
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

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value ?? null;
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value ?? null;

  // refresh 토큰이 없으면 검사할 필요도 없으므로 그대로 통과시킨다.
  if (!refreshToken) {
    return NextResponse.next();
  }

  // access 토큰이 존재하고 아직 유효하면 그대로 다음 단계 진행
  if (!isTokenExpired(accessToken)) {
    return NextResponse.next();
  }

  try {
    const newAccessToken = await requestRefresh(refreshToken);
    const requestHeaders = new Headers(request.headers);

    // x-withpet-access-token: SSR 레이아웃이 새 토큰을 읽어 Redux에 넣을 수 있게 하는 custom 헤더
    requestHeaders.set("x-withpet-access-token", newAccessToken);

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });

    // 새 access 토큰을 httpOnly 쿠키에 다시 심어서 다음 SSR 요청에서도 사용 가능하게 한다.
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
    const response = NextResponse.next();
    response.cookies.delete(ACCESS_COOKIE);
    response.cookies.delete(REFRESH_COOKIE);
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
