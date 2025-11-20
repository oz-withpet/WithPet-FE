export type Gender = "male" | "female";
export type PetType = "dog" | "cat";

export type SignupFormValues = {
  petDog: boolean;
  petCat: boolean;

  gender?: Gender;
  userName: string;
  nickname: string;

  email: string;
  verificationCode: string;
  password: string;
  password2: string;

  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeMarketing: boolean;
};

export type NicknameCheckResponse = {
  is_available: boolean;
};
// 이메일 사용 가능 여부 검사
// export type EmailValidationResponse = {
//   email: string;
//   success: boolean;
//   is_available: boolean;
//   message?: string;
// };

// export type SendEmailCodeResponse = unknown; // 아직 안 씀
// export type VerifyEmailCodeRequest = { email: string; code: string };
// export type VerifyEmailCodeResponse = unknown; // 아직 안 씀

export type SignupRequest = {
  email: string;
  password: string;
  password2: string;
  username: string;
  nickname: string;
  gender: Gender | string;
  pet_type: "dog" | "cat" | "both" | "none";
  verificationcode: string;
};

export type SignupResponse = {
  success: boolean;
};
