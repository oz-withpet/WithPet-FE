"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useDispatch } from "react-redux";

import { getMyProfile, withdraw } from "@/features/mypage/api/mypageApi";
import { useConfirm } from "@/providers/ConfirmProvider";
import { clearTokens } from "@/shared/store/authSlice";
import { MyProfileData } from "@/types/mypage";
export default function MypageProfileForm() {
  const [profile, setProfile] = useState<MyProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const confirm = useConfirm();
  const dispatch = useDispatch();

  //  내 프로필 조회
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        setProfile(res.data);
      } catch (error) {
        console.error("[GET MY PROFILE ERROR]", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  //  회원탈퇴
  const onDelete = async () => {
    const ok = await confirm({
      title: "정말 회원탈퇴 하시겠습니까?",
      description: "이 작업은 되돌릴 수 없습니다.",
      confirmText: "예",
      cancelText: "아니오",
      variant: "destructive",
    });
    if (!ok) return;

    try {
      await withdraw(); // 필요하면 비밀번호도 같이 넘길 수 있음

      // 토큰 정리
      dispatch(clearTokens());

      await confirm({
        title: "회원탈퇴 완료",
        description: "그동안 WithPet을 이용해 주셔서 감사합니다.",
        confirmText: "확인",
        cancelText: "닫기",
      });

      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("[WITHDRAW ERROR]", error);
      await confirm({
        title: "회원탈퇴 실패",
        description: "잠시 후 다시 시도해주세요.",
        confirmText: "확인",
        cancelText: "닫기",
        variant: "destructive",
      });
    }
  };

  // 2) 로딩/에러 처리
  if (loading) {
    return (
      <div className="flex w-wrapper items-center justify-center p-40 text-gray-900">
        프로필 불러오는 중...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex w-wrapper items-center justify-center p-40 text-gray-900">
        프로필 정보를 불러오지 못했습니다.
      </div>
    );
  }
  // 3) 표시용 값 가공
  const genderText = profile.gender === "male" ? "남자" : "여자";
  let petText = "없음";
  if (profile.pet_type === "dog") petText = "강아지";
  else if (profile.pet_type === "cat") petText = "고양이";

  return (
    <div className="flex w-wrapper items-center justify-center bg-orange-100 p-40 text-gray-900">
      <div className="flex w-edit flex-col rounded-xl border border-gray-300 p-3">
        <div className="mb-9 flex w-full items-center justify-center p-3 text-2xl">
          {profile.nickname}님 프로필
        </div>

        <div className="flex h-[285px] flex-col justify-between">
          <div className="flex items-center hover:cursor-default">
            이름:
            <div className="ml-2 rounded-full border-2 border-orange-300 bg-white px-5 py-1">
              {profile.username}
            </div>
          </div>

          <div className="flex items-center hover:cursor-default">
            성별:
            <div className="ml-2 rounded-full border-2 border-orange-300 bg-white px-5 py-1">
              {genderText}
            </div>
          </div>

          <div className="flex items-center hover:cursor-default">
            이메일:
            <div className="ml-2 rounded-full border-2 border-orange-300 bg-white px-5 py-1">
              {profile.email}
            </div>
          </div>

          <div className="flex items-center hover:cursor-default">
            닉네임:
            <div className="ml-2 rounded-full border-2 border-orange-300 bg-white px-5 py-1">
              {profile.nickname}
            </div>
          </div>

          <div className="flex items-center hover:cursor-default">
            반려동물 유무:
            <div className="ml-2 rounded-full border-2 border-orange-300 bg-white px-5 py-1">
              {petText}
            </div>
          </div>
        </div>

        <div className="my-10 flex w-full items-center justify-around">
          <Link
            href={"/mypage/profile/edit"}
            className="rounded-full border-2 border-orange-300 bg-white px-5 py-3 text-lg font-semibold hover:cursor-pointer hover:bg-orange-300 hover:font-bold hover:text-white"
          >
            수정하기
          </Link>
          <Link
            href={"/mypage/profile/password"}
            className="rounded-full border-2 border-orange-300 bg-white px-5 py-3 text-lg font-semibold hover:cursor-pointer hover:bg-orange-300 hover:font-bold hover:text-white"
          >
            비밀번호 변경
          </Link>

          <button
            onClick={onDelete}
            className="rounded-full border-2 border-orange-300 bg-white px-5 py-3 text-lg font-semibold hover:cursor-pointer hover:bg-orange-300 hover:font-bold hover:text-white"
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
