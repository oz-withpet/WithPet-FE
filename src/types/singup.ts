export type Gender = "male" | "female";
export type PetType = "dog" | "cat";

export type SignupFormValues = {
  // 반려동물: 둘 다 체크 가능, 둘 다 false면 '없음'
  petDog: boolean;
  petCat: boolean;

  gender: "male" | "female" | undefined;
  userName: string;
  nickname: string;

  email: string;
  verificationCode?: string; // 6자리 (선택)
  password: string;
  passwordConfirm: string;

  // 약관
  agreeTerms: boolean; // 필수
  agreePrivacy: boolean; // 필수
  agreeMarketing: boolean; // 선택
};

// 모킹 전용 타입
// 회원가입 관련 API 요청/응답 타입

// 닉네임 중복 검사 응답
export type NicknameCheckResponse = {
  available: boolean; // true면 사용 가능, false면 중복
};

// 이메일 인증코드 전송 응답
export type SendEmailCodeResponse = {
  requestId: string; // 이후 verify-code 때 같이 보낼 ID
  expiresInSeconds: number; // 유효 시간(더미 값)
  resendAvailableInSeconds: number; // 재전송 가능 시간(더미 값)
};

// 이메일 인증코드 검증 요청
export type VerifyEmailCodeRequest = {
  requestId: string; // send-code에서 받은 값
  code: string; // 사용자가 입력한 인증코드
};

// 이메일 인증코드 검증 응답
export type VerifyEmailCodeResponse = {
  verificationToken: string; // 인증 완료 토큰
  expiresAt: string; // 만료 시각 ISO 문자열(더미)
};
