"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import Button from "@/components/common/button/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  checkNicknameAvailability,
  // sendEmailCode,
  // verifyEmailCode,
  // checkEmailAvailability,
  signup,
} from "@/features/signup/api/signupApi";
import { useConfirm } from "@/providers/ConfirmProvider";
import { SignupFormValues, SignupRequest } from "@/types/singup";

import AgreementToggles from "./ui/agreementToggles";
export default function SignupForm() {
  // 닉네임 / 이메일 인증 관련 상태
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [isNicknameOk, setIsNicknameOk] = useState(false);

  // const [isSendingCode, setIsSendingCode] = useState(false);
  // const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  // const [verificationToken, setVerificationToken] = useState<string | null>(null);

  // const [isEmailAvailable, setIsEmailAvailable] = useState(false); // 이메일 중복검사 통과 여부

  const router = useRouter();
  const confirm = useConfirm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue,
    setError,
    clearErrors,
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
      password2: "",
      agreeTerms: false,
      agreePrivacy: false,
      agreeMarketing: false,
    },
  });
  // 닉네임 중복여부
  const handleCheckNickname = async () => {
    setIsNicknameOk(false);
    clearErrors("nickname");

    const nickname = getValues("nickname");
    if (!nickname) {
      setError("nickname", {
        type: "manual",
        message: "닉네임을 입력하세요.",
      });
      return;
    }

    setIsCheckingNickname(true);
    try {
      const data = await checkNicknameAvailability(nickname); // <-- 여기만 호출
      if (data.is_available) {
        setIsNicknameOk(true);
        clearErrors("nickname");
      } else {
        setIsNicknameOk(false);
        setError("nickname", {
          type: "manual",
          message: "이미 사용 중인 닉네임입니다.",
        });
      }
    } catch (error) {
      setError("nickname", {
        type: "server",
      });
    } finally {
      setIsCheckingNickname(false);
    }
  };
  // const handleCheckEmail = async () => {
  //   setIsEmailAvailable(false);
  //   clearErrors("email");

  //   const email = getValues("email");
  //   if (!email) {
  //     setError("email", {
  //       type: "manual",
  //       message: "이메일을 입력하세요.",
  //     });
  //     return;
  //   }

  //   try {
  //     const data = await checkEmailAvailability(email);

  //     if (data.is_available) {
  //       setIsEmailAvailable(true); // ✅ 이게 true 되면 밑에 인증 영역이 뜨게 할 거야
  //       clearErrors("email");
  //     } else {
  //       setIsEmailAvailable(false);
  //       setError("email", {
  //         type: "server",
  //         message: data.message || "이미 가입된 이메일입니다.",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("[EMAIL CHECK ERROR]", error);
  //     setIsEmailAvailable(false);
  //     setError("email", {
  //       type: "server",
  //       message: "이메일 중복검사에 실패했습니다.",
  //     });
  //   }
  // };

  // // ✅ 이메일 인증코드 전송 (signupApi 사용)
  // const handleSendEmailCode = async () => {
  //   setVerificationToken(null);
  //   clearErrors("verificationCode");

  //   const email = getValues("email");

  //   if (!email) {
  //     setError("email", {
  //       type: "manual",
  //       message: "이메일을 먼저 입력하세요.",
  //     });
  //     return;
  //   }

  //   setIsSendingCode(true);

  //   try {
  //     const res = await sendEmailCode(email);
  //     console.log("[email-code-send] OK", res);
  //     // 이 시점에서 실제 이메일로 코드가 발송됨
  //   } catch (error) {
  //     console.error("[EMAIL SEND ERROR]", error);
  //     setError("email", {
  //       type: "server",
  //       message: "이메일 전송에 실패했습니다.",
  //     });
  //   } finally {
  //     setIsSendingCode(false);
  //   }
  // };
  // //
  // const handleVerifyCode = async () => {
  //   clearErrors("verificationCode");

  //   const email = getValues("email");
  //   const code = getValues("verificationCode");

  //   if (!email) {
  //     setError("email", {
  //       type: "manual",
  //       message: "이메일을 먼저 입력하세요.",
  //     });
  //     return;
  //   }
  //   if (!code) {
  //     setError("verificationCode", {
  //       type: "manual",
  //       message: "인증코드를 입력하세요.",
  //     });
  //     return;
  //   }

  //   setIsVerifyingCode(true);
  //   try {
  //     // ✅ 그냥 백엔드에 요청만 보내고, 응답은 콘솔로만 확인
  //     const res = await verifyEmailCode({ email, code });
  //     console.log("[email-code-verify] response:", res);

  //     // 👉 여기서는 아직 성공/실패에 따른 UI 처리는 안 함
  //     //    나중에 백엔드랑 맞춰보고 여기서 verified, message 보고 처리하면 됨.
  //   } catch (error) {
  //     console.error("[EMAIL VERIFY ERROR]", error);
  //     setError("verificationCode", {
  //       type: "server",
  //       message: "인증 처리 중 오류가 발생했습니다.",
  //     });
  //   } finally {
  //     setIsVerifyingCode(false);
  //   }
  // };
  // 제출
  const onSubmit = async (values: SignupFormValues) => {
    // 1) 프론트에서만 쓰는 검증들 (서버 가기 전에 막을 것들)

    // 비밀번호/비번확인 - RHF에서 이미 검사하지만 안전빵으로 한 번 더
    if (values.password !== values.password2) {
      return;
    }

    // 이메일 인증을 필수로 강제하고 싶다면:
    // if (!verificationToken) {
    //   setError("verificationCode", {
    //     type: "manual",
    //     message: "이메일 인증을 먼저 완료해주세요.",
    //   });
    //   return;

    // (참고) pet 정보는 지금 백엔드 /auth/signup 스펙에는 없어서
    const pets: Array<"dog" | "cat"> = [];
    if (values.petDog) pets.push("dog");
    if (values.petCat) pets.push("cat");
    let pet_type: "dog" | "cat" | "both" | "none";
    if (pets.length === 0) pet_type = "none";
    else if (pets.length === 2) pet_type = "both";
    else pet_type = pets[0];

    // 2) 백엔드가 원하는 형식(SignupRequest)에 맞춰 payload 만들기
    const payload: SignupRequest = {
      email: values.email.trim(),
      password: values.password,
      password2: values.password2, // ✅ 백엔드에서 요구하는 필드
      username: values.userName.trim(),
      nickname: values.nickname.trim(),
      verificationcode: values.verificationCode.trim(), // 백엔드가 안 쓰면 그냥 무시될 것
      gender: values.gender!, // 라디오 필수니까 ! 사용
      pet_type,
    };

    try {
      const res = await signup(payload);
      console.log("[SIGNUP SUCCESS]", res);

      const accepted = await confirm({
        title: "🎉 회원가입 완료",
        description: `${values.userName}님의 가입이 성공적으로 처리되었습니다!`,
        confirmText: "메인으로 이동",
        cancelText: "닫기",
      });

      if (accepted) {
        router.push("/"); // 메인 페이지로
      }
    } catch (error) {
      console.error("[SIGNUP ERROR]", error);

      await confirm({
        title: "회원가입 실패",
        description: "잠시 후 다시 시도해주세요.",
        confirmText: "확인",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="bg-background-100 mx-auto w-full max-w-wrapper rounded-[28px]">
      <div className="mx-auto flex max-w-[620px] flex-col items-center py-20">
        {/* 타이틀 */}
        <div className="mb-8 flex items-baseline gap-[12px]">
          <span className="font-semibold text-gray-900">WithPet</span>
          <span className="text-sm text-gray-900">회원가입</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-[12px]">
          {/* 안내 문구 */}
          <div className="mb-[15px] w-full text-[13px] text-gray-100">
            <p className="text-[17px] font-semibold text-gray-900">반려동물 유무</p>
            <p className="text-[12px] text-gray-300">· 선택 안할 시 ‘없음’으로 저장됩니다.</p>
          </div>

          {/* 반려동물 유무 (선택) */}
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
                className="cursor-pointer rounded-full border border-line-strong px-[16px] py-[8px] text-[14px] text-gray-900 hover:bg-orange-300 hover:text-gray-50 peer-checked:border-line-strong peer-checked:bg-orange-300 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-orange-200"
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
                className="cursor-pointer rounded-full border border-line-strong px-[16px] py-[8px] text-[14px] text-gray-900 hover:bg-orange-300 hover:text-gray-50 peer-checked:border-line-strong peer-checked:bg-orange-300 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-orange-200"
              >
                고양이
              </Label>
            </div>
          </div>

          {/* 성별 */}
          <div className="mt-[12px]">
            <p className="mb-[8px] text-[17px] font-semibold text-gray-900">
              성별 <span className="text-[15px] text-warning">* 필수</span>
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
                  required
                  className="peer sr-only"
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
            <p className="text-[17px] font-semibold text-gray-900">성명</p>
            <Input
              className="text-gray-900"
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
              <p className="text-[17px] font-semibold text-gray-900">닉네임</p>
              <Input
                className="text-gray-900"
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

              {isNicknameOk && !errors.nickname && (
                <p className="text-xs text-green-600">닉네임 사용 가능 ✅</p>
              )}
            </div>
            <Button
              type="button"
              onClick={handleCheckNickname}
              disabled={isCheckingNickname}
              className="rounded-full border-line-strong px-[12px] text-[12px] transition hover:bg-orange-300"
            >
              {isCheckingNickname ? "검사중..." : "중복검사"}
            </Button>
          </div>

          {/* 이메일 + 인증하기 */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-[12px]">
            <div className="mb-[12px]">
              <p className="text-[17px] font-semibold text-gray-900">이메일</p>
              <Input
                className="text-gray-900"
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
          </div>

          {/* 이메일 인증하기 + 인증코드 입력 (항상 표시) */}
          {/* <div className="mt-2 flex justify-end">
            <Button
              type="button"
              onClick={handleSendEmailCode}
              disabled={isSendingCode} // 중복검사는 함수 안에서 체크
              className="rounded-full border-line-strong px-[12px] text-[12px] transition hover:bg-orange-300"
            >
              {isSendingCode ? "전송중..." : "이메일 인증하기"}
            </Button>
          </div>

          <div className="mt-2 flex flex-col gap-1">
            <div className="flex gap-2">
              <Input
                className="flex-1 text-gray-900"
                placeholder="메일로 받은 인증코드"
                {...register("verificationCode", {
                  validate: (v) => !v || /^\d{6}$/.test(v) || "6자리 숫자",
                })}
              />
              <Button
                type="button"
                className="rounded-full border-line-strong px-[12px] text-[12px] transition hover:bg-orange-300"
                onClick={handleVerifyCode}
                disabled={isVerifyingCode}
              >
                {isVerifyingCode ? "확인중..." : "인증확인"}
              </Button>
            </div>
            {errors.verificationCode && (
              <p className="mt-1 text-[12px] text-red-500">
                {errors.verificationCode.message || "이메일 인증 실패"}
              </p>
            )}
            {verificationToken && !errors.verificationCode && (
              <p className="text-xs text-green-600">이메일 인증 완료 ✅</p>
            )}
          </div>  */}

          {/* 비밀번호 */}
          <div className="space-y-[4px]">
            <p className="text-[17px] font-semibold text-gray-900">비밀번호</p>
            <Input
              className="text-gray-900"
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
            <p className="text-[17px] font-semibold text-gray-900">비밀번호 재확인</p>
            <Input
              className="text-gray-900"
              type="password"
              placeholder="[필수] 비밀번호를 확인해 주세요"
              {...register("password2", {
                required: "비밀번호를 다시 입력하세요.",
                validate: (v) => v === getValues("password") || "비밀번호가 일치하지 않습니다.",
              })}
            />
            <p className="text-[12px] text-gray-300">· 위 비밀번호와 동일하게 작성해주세요.</p>
            {errors.password2 && (
              <p className="text-[12px] text-red-500">{errors.password2.message}</p>
            )}
          </div>

          {/* 개인정보 동의 */}
          <AgreementToggles register={register} errors={errors} watch={watch} setValue={setValue} />
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
