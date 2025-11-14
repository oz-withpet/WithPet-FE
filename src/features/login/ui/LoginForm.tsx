"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "@/components/common/button/Button";
import { useConfirm } from "@/providers/ConfirmProvider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isLoginErrorResponse, isLoginSuccessResponse } from "@/types/login";

import { useLogin } from "../hooks/useLogin";

/**
 * 간단한 상태 기반 로그인 폼
 */
export default function LoginForm() {
  const { login, isLoading } = useLogin();
  const confirm = useConfirm();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      await confirm({
        title: "입력 확인",
        description: "이메일과 비밀번호를 모두 입력해주세요.",
        confirmText: "확인",
        cancelText: "닫기",
      });
      return;
    }

    try {
      const result = await login({ email, password });

      if (result.status >= 200 && result.status < 300) {
        if (isLoginSuccessResponse(result.body) && result.body.message) {
          const accepted = await confirm({
            title: "환영합니다",
            description: result.body.message,
            confirmText: "확인",
            cancelText: "닫기",
          });
          // 로그인 하면 홈으로 이동
          // todo: 모달 버튼 클릭시 이동하게 변경
          if (accepted) {
            router.push("/");
          }
        }
        return;
      }

      const detailMessage =
        (isLoginErrorResponse(result.body) && (result.body.detail || result.body.message)) ||
        "로그인을 진행할 수 없어요.";

      await confirm({
        title: "로그인 실패",
        description: detailMessage,
        confirmText: "확인",
        cancelText: "닫기",
      });
    } catch {
      await confirm({
        title: "오류",
        description: "서버와 통신에 실패했어요. 잠시 후 다시 시도해주세요.",
        confirmText: "확인",
        cancelText: "닫기",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="flex-center mx-auto min-h-[calc(100vh-60px)] max-w-[800px] bg-orange-100">
      <div className="flex-col-center h-full w-full px-[70px]">
        <div className="flex w-full flex-col items-center py-8">
          <div className="mb-7 flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-gray-900">WithPet</span>
            <span className="text-sm text-black">로그인</span>
          </div>

          <form className="w-full space-y-5" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="text-gray-900">
                이메일
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="text-gray-900"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-900">
                비밀번호
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="text-gray-900"
              />
            </div>

            <div className="pt-2 text-center">
              <Button
                type="submit"
                className="border border-line-light transition hover:bg-[#ff9806]"
                disabled={isLoading}
              >
                {isLoading ? "로그인 중..." : "로그인"}
              </Button>
            </div>
          </form>

          <div className="mt-10 h-px w-full bg-gray-200" />

          <div className="mt-6 flex items-center justify-center gap-10 text-sm font-bold text-black">
            <Link href="#">아이디 찾기</Link>
            <Link href="#">비밀번호 찾기</Link>
            <Link href="/signup">회원가입</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
