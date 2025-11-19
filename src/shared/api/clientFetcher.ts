"use client";

import { store } from "@/shared/store";

// 기본 URL
// 환경변수에 들어온 주소를 우선 사용하고 없으면 운영 서버 주소를 기본값으로 둔다
const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, "") ?? "https://api.withpet.space";

// 옵션정의
// 인증 여부나 바디 타입 정보까지 RequestInit에 얹어서 재사용 API마다 간단히 설정 가능
export interface ClientFetcherOptions extends RequestInit {
  auth?: "public" | "private";
  bodyType?: "json" | "form";
  query?: Record<string, string | number | boolean | undefined>;
}

export interface ClientFetcherError extends Error {
  status: number;
  body?: unknown;
}

/**
 * @@ 클라이언트용 fetch 래퍼
 * 경로만 넘기면 헤더, 인증, 오류 파싱까지 한 번에 처리되는 fetch 래퍼
 */
export async function clientFetcher<T>(
  path: string,
  { auth = "private", bodyType = "json", body, headers, query, ...rest }: ClientFetcherOptions = {},
): Promise<T> {
  const url = `${BACKEND_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const reqHeaders: Record<string, string> = {
    ...(bodyType === "json" ? { "Content-Type": "application/json" } : {}),
    ...(headers as Record<string, string>),
  };

  if (auth === "private") {
    // 인증헤더
    // Redux에 유지 중인 액세스 토큰을 바로 읽어서 Authorization 헤더에 붙임 (httpOnly 쿠키는 브라우저가 알아서 포함)
    const token = store.getState().auth.tokens?.accessToken;
    if (token) reqHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    credentials: auth === "private" ? "include" : "omit",
    headers: reqHeaders,
    body: bodyType === "json" && body && typeof body !== "string" ? JSON.stringify(body) : body,
    ...rest,
  });

  // 바디파싱
  // 서버가 JSON을 내려주지 않아도 디버깅할 수 있게 문자열도 그대로 반환
  const parseBody = async () => {
    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      return response.json();
    }
    const rawText = await response.text();
    try {
      return JSON.parse(rawText);
    } catch {
      return rawText;
    }
  };

  if (!response.ok) {
    const err = new Error(`Backend API Error: ${response.status}`) as ClientFetcherError;
    err.status = response.status;
    try {
      err.body = await parseBody();
    } catch {
      err.body = null;
    }
    throw err;
  }

  // 바디 없는경우
  // 204면 바디가 없으니 undefined를 그대로 돌려서 호출부에서 추가 파싱을 피함
  if (response.status === 204) {
    return undefined as T;
  }

  return (await parseBody()) as T;
}
