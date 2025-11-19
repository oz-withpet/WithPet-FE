"use client";

import { useState } from "react";

import Button from "@/components/common/button/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SignupFormValues } from "@/types/singup";

import type { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";

type AgreementModalType = "terms" | "privacy" | "marketing" | null;

interface AgreementsSectionProps {
  register: UseFormRegister<SignupFormValues>;
  errors: FieldErrors<SignupFormValues>;
  watch: UseFormWatch<SignupFormValues>;
  setValue: UseFormSetValue<SignupFormValues>;
}

export default function AgreementToggles({
  register,
  errors,
  watch,
  setValue,
}: AgreementsSectionProps) {
  const [agreementModal, setAgreementModal] = useState<AgreementModalType>(null);

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
    <>
      {/* ✅ 동의 섹션 */}
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
          {/* 이용약관 */}
          <li className="flex items-start justify-between gap-[12px]">
            <label className="flex flex-1 items-start gap-[8px] text-[14px] text-gray-900">
              <input
                type="checkbox"
                className="mt-[3px] h-[16px] w-[16px] accent-orange-300"
                {...register("agreeTerms", {
                  required: "이용약관 동의가 필요합니다.",
                })}
              />
              <span className="leading-[22px]">
                이용약관 동의 <span className="text-warning">*</span>
              </span>
            </label>
            <Button
              type="button"
              className="shrink-0 rounded-full border border-line-strong px-[12px] py-[6px] text-[12px] text-gray-900 transition hover:bg-orange-300"
              onClick={() => setAgreementModal("terms")}
            >
              자세히
            </Button>
          </li>

          {/* 개인정보 */}
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
            <Button
              type="button"
              className="shrink-0 rounded-full border border-line-strong px-[12px] py-[6px] text-[12px] text-gray-900 transition hover:bg-orange-300"
              onClick={() => setAgreementModal("privacy")}
            >
              자세히
            </Button>
          </li>

          {/* 마케팅 */}
          <li className="flex items-start justify-between gap-[12px]">
            <label className="flex flex-1 items-start gap-[8px] text-[14px] text-gray-900">
              <input
                type="checkbox"
                className="mt-[3px] h-[16px] w-[16px] accent-orange-300"
                {...register("agreeMarketing")}
              />
              <span className="leading-[22px]">마케팅 정보 수신 동의 (선택)</span>
            </label>
            <Button
              type="button"
              className="shrink-0 rounded-full border border-line-strong px-[12px] py-[6px] text-[12px] text-gray-900 transition hover:bg-orange-300"
              onClick={() => setAgreementModal("marketing")}
            >
              자세히
            </Button>
          </li>
        </ul>

        {/* 필수 동의 에러 표시 (옵션) */}
        <div className="mt-2 space-y-1 text-[12px] text-red-500">
          {errors.agreeTerms?.message && <p>{errors.agreeTerms.message}</p>}
          {errors.agreePrivacy?.message && <p>{errors.agreePrivacy.message}</p>}
        </div>
      </section>

      {/* ✅ 약관 상세 모달 */}
      <Dialog
        open={agreementModal !== null}
        onOpenChange={(open) => {
          if (!open) setAgreementModal(null);
        }}
      >
        <DialogContent className="max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {agreementModal === "terms" && "이용약관"}
              {agreementModal === "privacy" && "개인정보 수집 및 이용 동의"}
              {agreementModal === "marketing" && "마케팅 정보 수신 동의"}
            </DialogTitle>
            <DialogDescription>
              {agreementModal === "terms" && "WithPet 서비스 이용에 대한 기본 약관입니다."}
              {agreementModal === "privacy" &&
                "서비스 제공을 위한 최소한의 개인정보 수집 및 이용에 대한 안내입니다."}
              {agreementModal === "marketing" &&
                "이벤트·프로모션 등 마케팅 정보 수신에 대한 안내입니다."}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 max-h-[320px] space-y-4 overflow-y-auto text-sm leading-relaxed text-gray-900">
            {agreementModal === "terms" && (
              <>
                <p>1. 이용약관 동의</p>
                <p>[WithPet 이용약관]</p>
                <p>
                  1-1. 본 서비스는 반려동물 관련 정보 제공, 커뮤니티, 지도 등 기능을 제공합니다.
                </p>
                <p>1-2. 사용자는 서비스 이용 시 관련 법령과 본 약관을 준수해야 합니다.</p>
                <p>
                  1-3. 사용자가 서비스에 게시한 콘텐츠에 대한 책임은 전적으로 사용자에게 있습니다.
                </p>
                <p>
                  1-4. 회사는 서비스 품질 향상 및 안정적인 제공을 위해 서비스 내용을 변경하거나
                  중단할 수 있습니다. 이 경우 사전에 공지합니다.
                </p>
                <p>
                  1-5. 이용자가 약관을 위반하거나 불법/부적절한 행위를 할 경우, 회사는 서비스 이용을
                  제한하거나 계정을 해지할 수 있습니다.
                </p>
              </>
            )}

            {agreementModal === "privacy" && (
              <>
                <p>1. 수집하는 개인정보 항목</p>
                <p>
                  이메일, 닉네임, 성별, 반려동물 유무 등 서비스 제공에 필요한 최소한의 정보를
                  수집합니다.
                </p>
                <p>2. 개인정보의 이용 목적</p>
                <p>회원 식별, 서비스 이용 이력 관리, 공지사항 및 주요 안내 전달 등에 이용됩니다.</p>
                <p>3. 보유 및 이용 기간</p>
                <p>회원 탈퇴 시까지 보관 후 지체 없이 파기합니다.</p>
                <p>관련 법령에서 별도 보관을 요구하는 경우, 해당 기간 동안 보관할 수 있습니다.</p>
                <p>
                  4. 사용자는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으나, 이 경우
                  서비스 이용이 제한될 수 있습니다.
                </p>
              </>
            )}

            {agreementModal === "marketing" && (
              <>
                <p>1. 수신 동의를 할 경우, 이메일 등을 통해 다음 정보를 받아보실 수 있습니다.</p>
                <p>
                  이벤트, 프로모션, 할인 혜택 안내 <br />
                  신규 기능 및 서비스 소식
                </p>
                <p>2. 마케팅 정보 수신 동의 여부는 언제든지 철회할 수 있습니다.</p>
                <p>향후 설정 페이지 또는 고객 문의를 통해 수신 거부를 요청할 수 있습니다.</p>
                <p>
                  3. 마케팅 정보 수신 동의를 하지 않더라도 , 기본 서비스 이용에는 아무런 제약이
                  없습니다
                </p>
              </>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              type="button"
              className="rounded-full border border-line-strong px-4 py-2 text-sm"
              onClick={() => setAgreementModal(null)}
            >
              닫기
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
