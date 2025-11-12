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
