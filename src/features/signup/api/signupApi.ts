// src/features/signup/api/signupApi.ts
import { backendClient } from "@/shared/api/clientFeacher";
import type {
  SignupRequest,
  SignupResponse,
  NicknameCheckResponse,
  SendEmailCodeResponse,
  VerifyEmailCodeRequest,
  VerifyEmailCodeResponse,
  EmailValidationResponse,
} from "@/types/singup";

// 회원가입
export const signup = (payload: SignupRequest) => {
  return backendClient<SignupResponse>("/auth/signup/", {
    method: "POST",
    auth: "public",
    body: JSON.stringify(payload),
  });
};

// 닉네임 중복 검사 (이미 잘 쓰고 있던 거 그대로)
export const checkNicknameAvailability = (nickname: string) => {
  const path = `/mypage/profile/check-nickname?nickname=${encodeURIComponent(nickname)}`;

  return backendClient<NicknameCheckResponse>(path, {
    method: "GET",
    auth: "public",
  });
};

export const checkEmailAvailability = (email: string) => {
  return backendClient<EmailValidationResponse>(
    `/validation/email/?email=${encodeURIComponent(email)}`,
    {
      method: "GET",
      auth: "public",
    },
  );
};
// 이메일 인증코드 전송
export const sendEmailCode = (email: string) => {
  return backendClient<SendEmailCodeResponse>("/email/send/code/", {
    method: "POST",
    auth: "public",
    body: JSON.stringify({ email }),
  });
};

// 이메일 인증코드 검증
export const verifyEmailCode = (payload: VerifyEmailCodeRequest) => {
  return backendClient<VerifyEmailCodeResponse>("/email/code/verify/", {
    method: "POST",
    auth: "public",
    body: JSON.stringify(payload), // { email, code } 라고 가정
  });
};
