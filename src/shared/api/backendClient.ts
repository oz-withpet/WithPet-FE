"use client";

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, "") ?? "https://oz-withpet.kro.kr";

/**
 * 인증 여부, 요청 본문 타입 등을 제어할 수 있는 fetch 옵션
 *
 * - 인증 필요 여부 (기본값: private)
 * - 요청 본문 타입 (기본값: json)
 */
interface BackendClientOptions extends RequestInit {
  auth?: "public" | "private";
  bodyType?: "json" | "form";
}

/**
 * 백엔드 API용 fetch 클라이언트
 *
 * - 기본: JSON 요청 + 인증 포함(`credentials: include`)
 * - FormData 전송이나 비인증 요청은 옵션으로 제어 가능
 * - 에러 발생 시 콘솔에 상태 코드 출력
 */
export async function backendClient<T>(
  path: string,
  { auth = "private", bodyType = "json", body, headers, ...rest }: BackendClientOptions = {},
): Promise<T> {
  const url = `${BACKEND_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  // 기본 헤더 세팅
  const reqHeaders: Record<string, string> = {
    ...(bodyType === "json" ? { "Content-Type": "application/json" } : {}),
    ...(headers as Record<string, string>),
  };

  // 인증이 필요한 요청이면 토큰 추가
  if (auth === "private") {
    const token = localStorage.getItem("accessToken");
    if (token) reqHeaders["Authorization"] = `Bearer ${token}`;
  }

  // fetch 요청 실행
  const response = await fetch(url, {
    credentials: auth === "private" ? "include" : "omit",
    headers: reqHeaders,
    body: bodyType === "json" && body && typeof body !== "string" ? JSON.stringify(body) : body,
    ...rest,
  });

  // 응답 상태 코드 체크
  if (!response.ok) {
    console.error("Backend API Error:", response.status, response.statusText);
    throw new Error(`Backend API Error: ${response.status}`);
  }

  // 204(No Content) 처리
  if (response.status === 204) {
    return undefined as T;
  }

  // JSON 파싱 (content-type 안전 확인)
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return (await response.json()) as T;
  }

  // JSON 이외 응답(text 등)
  return (await response.text()) as unknown as T;
}
