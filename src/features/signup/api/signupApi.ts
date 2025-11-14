// src/features/auth/api/authApi.ts
// import { apiClient } from "@/shared/api/client";
// import type { SendCodeRes, VerifyCodeReq, VerifyCodeRes, NickCheckRes } from "@/types/singup";

/**
 * 인증/회원가입 도메인 전용 API 모듈
 *
 * - 사용 흐름은 `shared/api/client.ts → features/auth/api/authApi.ts → 도메인 훅(useEmailVerification/useNicknameAvailability 등) → 컴포넌트`
 * - client.ts 에서는 base URL, 공통 헤더만 정의하고 여기서는 실제 엔드포인트만 선언
 *
 * 예시)
 * ```ts
 * // 1) 공용 apiClient 가져오기
 * import { apiClient } from "@/shared/api/client";
 *
 * // 2) 도메인 API 파일에서 함수 작성
 * export const getFoo = () => apiClient("/api/foo");
 *
 * // 3) 해당 도메인 훅에서 호출
 * export function useFoo() {
 *   return useQuery({ queryKey: ["foo"], queryFn: getFoo });
 * }
 *
 * // 4) 컴포넌트에서 훅 사용
 * const { data } = useFoo();
 * ```
 */

import type {
  NicknameCheckResponse,
  SendEmailCodeResponse,
  VerifyEmailCodeRequest,
  VerifyEmailCodeResponse,
} from "@/types/singup";

// 공통 JSON 처리 유틸
const parseJsonOrThrow = async <T>(res: Response): Promise<T> => {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = data?.message ?? `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data as T;
};

// 닉네임 중복 검사
export const checkNicknameAvailability = async (
  nickname: string,
): Promise<NicknameCheckResponse> => {
  const res = await fetch(
    `/api/users/nickname/availability?nickname=${encodeURIComponent(nickname)}`,
  );
  return parseJsonOrThrow<NicknameCheckResponse>(res);
};

// 이메일 인증코드 전송
export const sendEmailCode = async (email: string): Promise<SendEmailCodeResponse> => {
  const res = await fetch("/api/email/send-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return parseJsonOrThrow<SendEmailCodeResponse>(res);
};

// 이메일 인증코드 검증
export const verifyEmailCode = async (
  payload: VerifyEmailCodeRequest,
): Promise<VerifyEmailCodeResponse> => {
  const res = await fetch("/api/email/verify-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJsonOrThrow<VerifyEmailCodeResponse>(res);
};
