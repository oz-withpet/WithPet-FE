const defaultHeaders: HeadersInit = {
  "Content-Type": "application/json",
};

/**
 * 기본 설정이 포함된 간단한 fetch 래퍼 함수입니다.
 *
 * - 모든 API 요청에 공통으로 적용할 옵션(헤더, 인증 등)을 포함합니다.
 * - 요청이 실패할 경우 HTTP 상태 코드를 기반으로 에러를 발생시킵니다.
 *
 * @param url - 요청을 보낼 API 주소 (엔드포인트 또는 절대 경로)
 * @param options - fetch 옵션 객체 (메서드, 헤더, 바디 등)
 * @returns 제네릭 타입 T 형태의 응답 데이터를 Promise로 반환
 */
export const apiClient = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(url, {
    headers: { ...defaultHeaders, ...options.headers },
    credentials: "include", // 쿠키 등 인증 정보를 함께 전송
    ...options,
  });

  // 응답이 실패한 경우 에러 발생
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  // 응답 데이터를 JSON으로 변환 후 반환
  return response.json() as Promise<T>;
};
