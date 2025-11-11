"use client";

import Button from "@/components/common/button/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignupFormValues } from "@/types/singup";
import { useForm } from "react-hook-form";
export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue,
  } = useForm<SignupFormValues>({
    mode: "onBlur",
    defaultValues: {
      petDog: false,
      petCat: false,
      gender: undefined,
      userName: "",
      nickname: "",
      email: "",
      verificationCode: "",
      password: "",
      passwordConfirm: "",
      agreeTerms: false,
      agreePrivacy: false,
      agreeMarketing: false,
    },
  });
  {
    /*제출*/
  }
  const onSubmit = (values: SignupFormValues) => {
    if (values.password !== values.passwordConfirm) {
      // 교차검증은 rules에도 있지만, 리마인드용으로 안전하게 한 번 더 체크해도 OK
      return alert("비밀번호가 일치하지 않습니다.");
    }
    const pets: Array<"dog" | "cat"> = [];
    if (values.petDog) pets.push("dog");
    if (values.petCat) pets.push("cat");

    const payload = {
      gender: values.gender === "male" ? "male" : "female",
      userName: values.userName.trim(),
      nickname: values.nickname.trim(),
      email: values.email.trim(),
      pets,
      havePet: pets.length ? "yes" : "no",
      password: "*".repeat(values.password.length),
      marketingOptIn: values.agreeMarketing,
      agreed: { terms: values.agreeTerms, privacy: values.agreePrivacy },
    };

    console.log("payload", payload);
    alert("유효성 통과! (콘솔 확인)");
  };
  // “전체 동의” 토글
  const agreeTerms = watch("agreeTerms");
  const agreePrivacy = watch("agreePrivacy");
  const agreeMarketing = watch("agreeMarketing");
  const allAgreed = agreeTerms && agreePrivacy && agreeMarketing;
  const toggleAll = (checked: boolean) => {
    setValue("agreeTerms", checked, { shouldValidate: true });
    setValue("agreePrivacy", checked, { shouldValidate: true });
    setValue("agreeMarketing", checked, { shouldValidate: true });
  };

  return (
    <section className="bg-background-100 mx-auto w-full max-w-wrapper rounded-[28px]">
      <div className="mx-auto flex max-w-[620px] flex-col items-center py-20">
        {/* 타이틀 */}
        <div className="mb-8 flex items-baseline gap-[12px]">
          <span className="font-semibold text-gray-900">WithPet</span>
          <span className="text-sm text-gray-900">회원가입</span>
        </div>

        {/* 폼 (스타일 전용) */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-[12px]">
          {/* 안내 문구 */}
          <div className="mb-[15px] w-full text-[13px] text-gray-100">
            <p className="text-[17px] font-semibold text-gray-900">반려동물 유무</p>
            <p className="text-[12px] text-gray-300">· 선택 안할 시 ‘없음’으로 저장됩니다.</p>
          </div>

          {/* 반려동물 유무 (선택) — 버튼형 체크박스 (id + htmlFor) */}
          <div className="flex items-center gap-[12px]">
            {/* 강아지 */}
            <div>
              <input
                id="pet-dog"
                type="checkbox"
                className="peer sr-only"
                {...register("petDog")}
              />
              <Label
                htmlFor="pet-dog"
                className="cursor-pointer rounded-full border border-line-strong px-[16px] py-[8px] text-[14px] text-gray-900 hover:bg-orange-300 hover:text-gray-50 peer-checked:border-line-strong peer-checked:bg-orange-300 peer-checked:text-gray-50 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-orange-200"
              >
                강아지
              </Label>
            </div>
            {/* 고양이 */}
            <div>
              <input
                id="pet-cat"
                type="checkbox"
                className="peer sr-only"
                {...register("petCat")}
              />
              <Label
                htmlFor="pet-cat"
                className="cursor-pointer rounded-full border border-line-strong px-[16px] py-[8px] text-[14px] text-gray-900 hover:bg-orange-300 hover:text-gray-50 peer-checked:border-line-strong peer-checked:bg-orange-300 peer-checked:text-gray-50 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-orange-200"
              >
                고양이
              </Label>
            </div>
          </div>

          {/* 성별 (필수) — 버튼형 라디오 (id + htmlFor) */}
          <div className="mt-[12px]">
            <p className="mb-[8px] text-[17px] font-semibold text-gray-900">
              성별 <span className="text-warning">* 필수</span>
            </p>

            <div className="flex items-center gap-[12px]">
              <div>
                <input
                  id="male"
                  type="radio"
                  value="male"
                  required
                  className="peer sr-only"
                  {...register("gender", { required: "성별을 선택하세요." })}
                />
                <Label
                  htmlFor="male"
                  className="cursor-pointer rounded-full border border-line-strong px-[16px] py-[8px] text-[14px] text-gray-900 hover:bg-orange-300 hover:text-gray-50 peer-checked:border-line-strong peer-checked:bg-orange-300 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-orange-200"
                >
                  남자
                </Label>
              </div>
              <div>
                <input
                  id="female"
                  type="radio"
                  value="female"
                  className="peer sr-only"
                  required
                  {...register("gender", { required: "성별을 선택하세요." })}
                />
                <Label
                  htmlFor="female"
                  className="cursor-pointer rounded-full border border-line-strong px-[16px] py-[8px] text-[14px] text-gray-900 hover:bg-orange-300 hover:text-gray-50 peer-checked:border-line-strong peer-checked:bg-orange-300 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-orange-200"
                >
                  여자
                </Label>
              </div>
            </div>
          </div>

          {/* 이름 */}
          <div>
            <Input
              placeholder="[필수] 성명을 입력해 주세요"
              {...register("userName", {
                required: "성명을 입력하세요.",
                minLength: { value: 2, message: "2자 이상" },
              })}
            />
            {errors.userName && (
              <p className="mt-1 text-[12px] text-red-500">{errors.userName.message}</p>
            )}
          </div>

          {/* 닉네임 + 중복검사 */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-[12px]">
            <div>
              <Input
                placeholder="[필수] 닉네임을 입력해 주세요"
                {...register("nickname", {
                  required: "닉네임을 입력하세요.",
                  minLength: { value: 2, message: "2자 이상" },
                  maxLength: { value: 20, message: "20자 이하" },
                })}
              />
              {errors.nickname && (
                <p className="mt-1 text-[12px] text-red-500">{errors.nickname.message}</p>
              )}
            </div>
            <Button className="rounded-full border-line-strong px-[12px] text-[12px] transition hover:bg-orange-300">
              중복검사
            </Button>
          </div>

          {/* 이메일 + 인증하기 */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-[12px]">
            <div>
              <Input
                type="email"
                placeholder="[필수] 이메일을 입력해 주세요"
                {...register("email", {
                  required: "이메일을 입력하세요.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "이메일 형식이 아닙니다.",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-[12px] text-red-500">{errors.email.message}</p>
              )}
            </div>
            <Button className="rounded-full border-line-strong px-[12px] text-[12px] transition hover:bg-orange-300">
              인증하기
            </Button>
          </div>

          {/* 인증번호 */}
          <div>
            <Input
              placeholder="인증번호 입력"
              {...register("verificationCode", {
                validate: (v) => !v || /^\d{6}$/.test(v) || "6자리 숫자",
              })}
            />
            {errors.verificationCode && (
              <p className="mt-1 text-[12px] text-red-500">{errors.verificationCode.message}</p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="space-y-[4px]">
            <Input
              type="password"
              placeholder="[필수] 비밀번호를 입력해 주세요"
              {...register("password", {
                required: "비밀번호를 입력하세요.",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  message: "8자 이상이며 대소문자를 혼합해야 합니다.",
                },
              })}
            />
            <p className="text-[12px] text-gray-300">
              · 비밀번호는 8자 이상/대소문자 혼합이어야 합니다.
            </p>
            {errors.password && (
              <p className="text-[12px] text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className="space-y-[4px]">
            <Input
              type="password"
              placeholder="[필수] 비밀번호를 확인해 주세요"
              {...register("passwordConfirm", {
                required: "비밀번호를 다시 입력하세요.",
                validate: (v) => v === getValues("password") || "비밀번호가 일치하지 않습니다.",
              })}
            />
            <p className="text-[12px] text-gray-300">· 위 비밀번호와 동일하게 작성해주세요.</p>
            {errors.passwordConfirm && (
              <p className="text-[12px] text-red-500">{errors.passwordConfirm.message}</p>
            )}
          </div>

          {/* 개인정보 동의 */}
          <section className="mt-[24px] w-full rounded-[16px] border border-line-light bg-white p-[20px]">
            <div className="mb-[12px] flex items-center justify-between">
              <label className="flex items-center gap-[8px] text-[14px] font-semibold text-gray-900">
                <input
                  type="checkbox"
                  className="h-[16px] w-[16px] accent-orange-300"
                  checked={allAgreed}
                  onChange={(e) => toggleAll(e.currentTarget.checked)}
                />
                전체 동의
              </label>
              <span className="text-[12px] text-gray-400">선택 포함</span>
            </div>

            <div className="mb-[12px] h-[1px] w-full bg-gray-300" />

            <ul className="flex flex-col gap-[12px]">
              <li className="flex items-start justify-between gap-[12px]">
                <label className="flex flex-1 items-start gap-[8px] text-[14px] text-gray-900">
                  <input
                    type="checkbox"
                    className="mt-[3px] h-[16px] w-[16px] accent-orange-300"
                    {...register("agreeTerms", { required: "이용약관 동의가 필요합니다." })}
                  />
                  <span className="leading-[22px]">
                    이용약관 동의 <span className="text-warning">*</span>
                  </span>
                </label>
                <Button className="shrink-0 rounded-full border border-line-strong px-[12px] py-[6px] text-[12px] text-gray-900 transition hover:bg-orange-300">
                  자세히
                </Button>
              </li>

              <li className="flex items-start justify-between gap-[12px]">
                <label className="flex flex-1 items-start gap-[8px] text-[14px] text-gray-900">
                  <input
                    type="checkbox"
                    className="mt-[3px] h-[16px] w-[16px] accent-orange-300"
                    {...register("agreePrivacy", {
                      required: "개인정보 수집·이용 동의가 필요합니다.",
                    })}
                  />
                  <span className="leading-[22px]">
                    개인정보 수집 및 이용 동의 <span className="text-warning">*</span>
                  </span>
                </label>
                <Button className="shrink-0 rounded-full border border-line-strong px-[12px] py-[6px] text-[12px] text-gray-900 transition hover:bg-orange-300">
                  자세히
                </Button>
              </li>

              <li className="flex items-start justify-between gap-[12px]">
                <label className="flex flex-1 items-start gap-[8px] text-[14px] text-gray-900">
                  <input
                    type="checkbox"
                    className="mt-[3px] h-[16px] w-[16px] accent-orange-300"
                    {...register("agreeMarketing")}
                  />
                  <span className="leading-[22px]">마케팅 정보 수신 동의 (선택)</span>
                </label>
                <Button className="shrink-0 rounded-full border border-line-strong px-[12px] py-[6px] text-[12px] text-gray-900 transition hover:bg-orange-300">
                  자세히
                </Button>
              </li>
            </ul>
          </section>

          {/* 제출 버튼 */}
          <div className="pt-[8px] text-center">
            <Button
              type="submit"
              className="inline-block rounded-full border border-line-strong px-[32px] py-[8px] text-sm font-semibold text-gray-900 transition hover:bg-orange-300 active:scale-[0.99]"
            >
              회원가입
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
