"use client";

import { useState } from "react";

import { checkMyNickname } from "@/features/mypage/api/mypageApi";

interface NicknameCheckFormProps {
  currentNickname: string;
}

export default function NicknameCheckForm({ currentNickname }: NicknameCheckFormProps) {
  const [value, setValue] = useState(currentNickname);
  const [isChecking, setIsChecking] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "duplicate" | "error">("idle");

  const handleCheck = async () => {
    const nickname = value.trim();
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    // 기존 닉네임이면 그냥 OK 처리 (중복검사 안 해도 됨)
    if (nickname === currentNickname) {
      setStatus("ok");
      return;
    }

    try {
      setIsChecking(true);
      const res = await checkMyNickname(nickname);
      if (res.is_available) {
        setStatus("ok");
      } else {
        setStatus("duplicate");
      }
    } catch (error) {
      console.error("[CHECK MY NICKNAME ERROR]", error);
      setStatus("error");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        <input
          name="nickname" // ← 여기 중요: FormData에서 꺼낼 이름
          className="flex-1 rounded-full border-2 border-orange-300 bg-white px-4 py-2 text-lg"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setStatus("idle");
          }}
          placeholder="닉네임을 입력하세요"
        />
        <button
          type="button"
          onClick={handleCheck}
          disabled={isChecking}
          className="shrink-0 rounded-full border-2 border-orange-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-orange-300 hover:text-white disabled:opacity-60"
        >
          {isChecking ? "검사 중..." : "중복검사"}
        </button>
      </div>

      {status === "ok" && <p className="text-xs text-green-600">사용 가능한 닉네임입니다 ✅</p>}
      {status === "duplicate" && (
        <p className="text-xs text-red-500">이미 사용 중인 닉네임입니다.</p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-500">닉네임 검사 중 오류가 발생했습니다.</p>
      )}
    </div>
  );
}
