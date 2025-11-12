"use client";

import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/shared/store";
import { setTokens } from "@/shared/store/authSlice";
import { type LoginRequestPayload, isLoginSuccessResponse } from "@/types/login";

import { loginRequest, type LoginResult } from "../api/loginApi";

/**
 * 로그인 API + 토큰 저장 담당 훅
 */
export function useLogin() {
  const dispatch = useDispatch<AppDispatch>();

  const mutation = useMutation<LoginResult, Error, LoginRequestPayload>({
    mutationKey: ["login"],
    mutationFn: (payload) => loginRequest(payload),
    onSuccess: (result, variables) => {
      console.warn("login response", result);

      if (result.status >= 200 && result.status < 300 && isLoginSuccessResponse(result.body)) {
        // 토큰저장
        // 응답 받은 액세스 토큰만 Redux에 보관하고 리프레시 토큰은 서버가 내려준 httpOnly 쿠키에 맡김
        dispatch(
          setTokens({
            accessToken: result.body.access,
            tokenType: "Bearer",
            expiresIn: 0,
            userEmail: variables.email,
          }),
        );
      }
    },
  });

  const login = (payload: LoginRequestPayload) => mutation.mutateAsync(payload);

  return {
    login,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
