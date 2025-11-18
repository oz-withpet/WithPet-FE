"use client";

import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import { getMyProfile } from "@/features/mypage/api/mypageApi";
import { useConfirm } from "@/providers/ConfirmProvider";
// 나중에 탈퇴 붙일 땐 withdraw 도 가져오면 됨
// import { withdraw } from "@/features/mypage/api/mypageApi";

export default function MypageProfileForm() {
  const confirm = useConfirm();

  // 1) 프로필 불러오기
  const { data, isLoading, isError } = useQuery({
    queryKey: ["mypage", "profile"],
    queryFn: getMyProfile,
  });

  const profile = data?.data;

  const onDelete = async () => {
    const ok = await confirm({
      title: "정말 회원탈퇴 하시겠습니까?",
      description: "이 작업은 되돌릴 수 없습니다.",
      confirmText: "예",
      cancelText: "아니오",
      variant: "destructive",
    });
    if (!ok) return;

    // TODO: 탈퇴 API 연동 (나중에)
    // await withdraw();
    console.log("삭제 진행!");
  };

  // 2) 로딩/에러 처리
  if (isLoading) {
    return (
      <div className="flex w-wrapper items-center justify-center p-40 text-gray-900">
        프로필 불러오는 중...
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="flex w-wrapper items-center justify-center p-40 text-gray-900">
        프로필 정보를 불러오지 못했습니다.
      </div>
    );
  }

  // 3) 표시용 값 가공
  const nickname = profile.nickname;
  const username = profile.username;
  const email = profile.email;
  const genderLabel =
    profile.gender === "male" ? "남자" : profile.gender === "female" ? "여자" : "-";
  const hasPetLabel = profile.has_pet ? "있음" : "없음";

  return (
    <div className="flex w-wrapper items-center justify-center bg-orange-100 p-40 text-gray-900">
      <div className="flex w-edit flex-col rounded-xl border border-gray-300 p-3">
        <div className="mb-9 flex w-full items-center justify-center p-3 text-2xl">
          {nickname}님 프로필
        </div>

        <div className="flex h-[285px] flex-col justify-between">
          <div className="flex items-center hover:cursor-default">
            이름:
            <div className="ml-2 rounded-full border-2 border-orange-300 bg-white px-5 py-1">
              {username}
            </div>
          </div>

          <div className="flex items-center hover:cursor-default">
            성별:
            <div className="ml-2 rounded-full border-2 border-orange-300 bg-white px-5 py-1">
              {genderLabel}
            </div>
          </div>

          <div className="flex items-center hover:cursor-default">
            이메일:
            <div className="ml-2 rounded-full border-2 border-orange-300 bg-white px-5 py-1">
              {email}
            </div>
          </div>

          <div className="flex items-center hover:cursor-default">
            닉네임:
            <div className="ml-2 rounded-full border-2 border-orange-300 bg-white px-5 py-1">
              {nickname}
            </div>
          </div>

          <div className="flex items-center hover:cursor-default">
            반려동물 유무:
            <div className="ml-2 rounded-full border-2 border-orange-300 bg-white px-5 py-1">
              {hasPetLabel}
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
