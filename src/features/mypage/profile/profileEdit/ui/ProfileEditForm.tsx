"use client";

import { FormEvent, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import NicknameCheckForm from "@/components/common/input/NickNameCheckForm";
import { GenderField, Gender } from "@/components/common/radio/GenderRadio";
import PetTypeField, { PetType } from "@/components/common/radio/PetTypeForm";
import { getMyProfile, updateMyProfile } from "@/features/mypage/api/mypageApi";
import { useConfirm } from "@/providers/ConfirmProvider";
import type { MyProfileData, MyProfileUpdateRequest } from "@/types/mypage";
export default function ProfileEditForm() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<MyProfileData | null>(null);
  const [saving, setSaving] = useState(false);
  const confirm = useConfirm();
  const router = useRouter();
  // 1) 처음 들어왔을 때 프로필 불러와서 폼 초기값 세팅
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        setProfile(res.data);
      } catch (error) {
        console.error("[GET MY PROFILE FOR EDIT ERROR]", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 2) 폼 submit → PATCH /mypage/profile
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // NicknameCheckForm 안의 input이 name="nickname"이라고 가정
    const nickname = (formData.get("nickname") || "").toString().trim();
    const gender = formData.get("gender") as Gender | null;
    const petType = formData.get("petType") as PetType | null;

    if (!nickname) {
      return;
    }
    if (!gender) {
      return;
    }
    const payload: MyProfileUpdateRequest = {
      nickname,
      gender,
      pet_type: petType ?? "none",
    };

    try {
      setSaving(true);
      await updateMyProfile(payload);

      const accepted = await confirm({
        title: "프로필 수정 완료",
        description: "프로필 정보가 성공적으로 수정되었습니다.",
        confirmText: "확인",
        cancelText: "닫기",
      });

      if (accepted) {
        router.push("/mypage/profile");
      }
    } catch (error) {
      console.error("[UPDATE MY PROFILE ERROR]", error);
      await confirm({
        title: "프로필 수정 실패",
        description: "잠시 후 다시 시도해주세요.",
        confirmText: "확인",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex w-wrapper items-center justify-center bg-orange-100 p-40 text-gray-900">
        <div>로딩 중...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex w-wrapper items-center justify-center bg-orange-100 p-40 text-gray-900">
        <div>프로필 정보를 불러오지 못했습니다.</div>
      </div>
    );
  }
  const displayNickname = profile.nickname || profile.email;
  const defaultPetType: PetType = profile.pet_type ?? "none";

  return (
    <div className="flex w-wrapper items-center justify-center bg-orange-100 p-40 text-gray-900">
      <div className="flex w-edit flex-col rounded-xl border border-gray-300 p-3 hover:cursor-default">
        <div className="mb-9 flex w-full items-center justify-center p-3 text-2xl">
          {displayNickname}님 프로필 수정
        </div>

        <form className="flex flex-col justify-between" onSubmit={onSubmit}>
          {/* 닉네임 */}
          <div className="my-2 flex flex-col">
            <div className="mb-3 text-lg">닉네임</div>
            {/* NicknameCheckForm 내부 input이 name="nickname"이고 기본값을 currentNickname으로 사용한다고 가정 */}
            <NicknameCheckForm currentNickname={profile.nickname} />
          </div>

          {/* 성별 */}
          <div className="my-2 flex flex-col">
            <div className="mb-3 flex items-center text-red-500">
              <div className="mr-2 text-lg text-gray-900">성별</div> * 필수
            </div>
            {/* GenderField가 defaultValue prop을 받는다고 가정 */}
            <GenderField defaultValue={profile.gender as Gender} />
          </div>

          {/* 반려동물 유무 */}
          <div className="my-2 flex flex-col">
            <div className="mb-3 mr-2 text-lg text-gray-900">반려동물 유무</div>
            {/* 기존대로, 기본값만 서버 값에서 세팅 */}
            <PetTypeField defaultValue={defaultPetType} />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-5 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 font-semibold hover:bg-orange-300 hover:text-white disabled:opacity-60"
          >
            {saving ? "수정 중..." : "수정하기"}
          </button>
        </form>
      </div>
    </div>
  );
}
