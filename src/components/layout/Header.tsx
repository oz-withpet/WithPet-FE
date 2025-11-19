"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import { getMyProfile } from "@/features/mypage/api/mypageApi";
import type { RootState } from "@/shared/store";
import { clearTokens } from "@/shared/store/authSlice";

import Button from "../common/button/Button";

export default function Header() {
  const dispatch = useDispatch();
  const tokens = useSelector((state: RootState) => state.auth.tokens);
  const isLoggedIn = Boolean(tokens?.accessToken);
  const pathname = usePathname();
  const isMapActive = /^\/map(\/|$)/.test(pathname);
  const isCutActive = /^\/community(\/|$)/.test(pathname);
  const isWriteActive = /^\/community\/write(\/|$)/.test(pathname);
  const isMypageActive = /^\/mypage(\/|$)/.test(pathname);

  const handleLogout = () => {
    dispatch(clearTokens());
  };

  // 로그인 상태에만 userName 프로필 가져오기
  const { data: profileRes } = useQuery({
    queryKey: ["mypage", "profile", "header"],
    queryFn: getMyProfile,
    enabled: isLoggedIn,
  });
  const profile = profileRes?.data;
  const displayName = profile?.nickname ?? profile?.username ?? tokens?.userEmail ?? "내 정보";

  return (
    <header className="flex h-[60px] w-full items-center justify-center border-b border-b-gray-200 bg-white">
      <nav className="flex w-wrapper items-center justify-between">
        <div className="flex w-[285px] items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-900">
            WithPet
          </Link>
          <Link
            href="/map"
            aria-current={isMapActive ? "page" : undefined}
            className="text-gray-400 hover:text-orange-300 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
          >
            지도
          </Link>
          <Link
            href="/community/category/all"
            aria-current={isCutActive ? "page" : undefined}
            className="text-gray-400 hover:text-orange-300 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
          >
            커뮤니티
          </Link>
        </div>
        {isLoggedIn ? (
          <div className="flex items-center justify-center">
            <Link
              href="/community/write"
              aria-current={isWriteActive ? "page" : undefined}
              // className="mx-2 rounded-2xl border-2 border-orange-300 px-4 py-1 text-gray-900 hover:border-orange-300 hover:bg-orange-300 hover:font-semibold hover:text-white aria-[current=page]:bg-orange-300 aria-[current=page]:font-semibold aria-[current=page]:text-white"
            >
              <Button
                type="button"
                status="primary"
                className="mx-2 rounded-md border-[1px] px-4 py-2 text-sm"
              >
                글쓰기
              </Button>
            </Link>
            <Link
              href="/mypage/profile"
              aria-current={isMypageActive ? "page" : undefined}
              // className="mx-2 rounded-2xl border-2 border-orange-300 px-4 py-1 text-gray-900 hover:border-orange-300 hover:bg-orange-300 hover:font-semibold hover:text-white aria-[current=page]:bg-orange-300 aria-[current=page]:font-semibold aria-[current=page]:text-white"
            >
              <Button
                type="button"
                status="primary"
                className="mx-2 rounded-md border-[1px] px-4 py-2 text-sm"
              >
                {displayName} 님
              </Button>
            </Link>
            <Button
              type="button"
              className="mx-2 rounded-md border-[1px] px-4 py-2 text-sm"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Link href="/login" className="mx-2">
              <Button className="rounded-md border-[1px] p-2">로그인</Button>
            </Link>
            <Link href="/signup" className="mx-2">
              <Button className="rounded-md border-[1px] p-2">회원가입</Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
