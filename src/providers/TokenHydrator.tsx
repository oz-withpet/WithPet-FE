"use client";

import { useEffect } from "react";

import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/shared/store";
import { clearTokens, setTokens } from "@/shared/store/authSlice";

interface TokenHydratorProps {
  accessToken: string | null;
}

/**
 * @@토큰동기화
 * @@설명: 서버 미들웨어에서 갱신한 access 토큰을 클라이언트 Redux 상태와 맞춰준다.
 */
export default function TokenHydrator({ accessToken }: TokenHydratorProps) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // 서버에서 새 access 토큰을 받아왔다면 Redux에 저장해서 CSR fetcher가 바로 사용할 수 있게 한다.
    if (accessToken) {
      dispatch(
        setTokens({
          accessToken,
          tokenType: "Bearer",
          expiresIn: 0,
        }),
      );
      return;
    }

    // 토큰이 없으면 로그아웃 상태로 전환해서 보호된 페이지 접근 시 재로그인을 유도한다.
    dispatch(clearTokens());
  }, [accessToken, dispatch]);

  return null;
}
