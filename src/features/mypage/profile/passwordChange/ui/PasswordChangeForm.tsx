"use client";

import { FormEvent, useEffect, useState } from "react";

import Button from "@/components/common/button/Button";
import { changePassword, getMyProfile } from "@/features/mypage/api/mypageApi";
import { useConfirm } from "@/providers/ConfirmProvider";
import type { MyProfileData } from "@/types/mypage";

export default function PasswordChangePage() {
  const [saving, setSaving] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState<string>("");
  const confirm = useConfirm();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        const profile: MyProfileData = res.data;
        setNickname(profile.nickname || profile.email);
      } catch (error) {
        console.error("[GET MY PROFILE FOR PASSWORD PAGE ERROR]", error);
      }
    };

    fetchProfile();
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPassword || !newPasswordConfirm) {
      await confirm({
        title: "비밀번호를 입력해주세요",
        confirmText: "확인",
        cancelText: "닫기",
      });
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      await confirm({
        title: "비밀번호가 일치하지않습니다",
        confirmText: "확인",
        cancelText: "닫기",
      });
      return;
    }

    // 회원가입 때랑 규칙 맞추고 싶으면 여기서도 검사
    if (!/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(newPassword)) {
      await confirm({
        title: "비밀번호는 8자 이상이며 대소문자를 혼합해야 합니다.",
        confirmText: "확인",
        cancelText: "닫기",
      });
      return;
    }

    try {
      setSaving(true);
      const res = await changePassword({
        new_password: newPassword,
        new_password_confirm: newPasswordConfirm,
      });

      await confirm({
        title: "비밀번호 변경 완료",
        description: res.message || "비밀번호가 성공적으로 변경되었습니다.",
        confirmText: "확인",
        cancelText: "닫기",
      });
      setNewPassword("");
      setNewPasswordConfirm("");
    } catch (error) {
      console.error("[CHANGE PASSWORD ERROR]", error);
      await confirm({
        title: "비밀번호 변경 실패",
        description: "잠시 후 다시 시도해주세요.",
        confirmText: "확인",
        cancelText: "닫기",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex w-wrapper items-center justify-center bg-orange-100 p-40 text-gray-900">
      <div className="flex w-edit flex-col rounded-xl border border-gray-300 p-3 hover:cursor-default">
        <div className="mb-9 flex w-full items-center justify-center p-3 text-2xl">
          {nickname ? `${nickname}님 비밀번호 변경` : "비밀번호 변경"}
        </div>

        <form onSubmit={onSubmit} className="flex flex-col justify-between">
          <div className="my-2 flex flex-col">
            <div className="mb-3 text-lg">변경 비밀번호</div>
            <div className="flex w-full items-start justify-between">
              <div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-big rounded-xl border-2 border-orange-300 bg-white p-2.5 outline-none"
                  placeholder="변경할 비밀번호를 입력해주세요."
                />
                <div className="text-sm text-gray-300">
                  * 비밀번호는 8자 이상, 대문자 혼합이어야 합니다.
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 flex flex-col">
            <div className="mb-3 text-lg">비밀번호 확인</div>
            <div className="flex w-full items-start justify-between">
              <div>
                <input
                  type="password"
                  value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                  className="w-big rounded-xl border-2 border-orange-300 bg-white p-2.5 outline-none"
                  placeholder="위와 동일한 비밀번호를 입력해주세요."
                />
                <div className="text-sm text-gray-300">* 위 비밀번호와 동일하게 작성해주세요.</div>
              </div>
            </div>
          </div>
          <Button
            disabled={saving}
            type="submit" // ← submit 이어야 내장 검증이 트리거됨
            className="mt-5 rounded-lg bg-orange-300 px-4 py-2 font-semibold text-white hover:bg-orange-300"
          >
            {saving ? "변경 중..." : "비밀번호 변경"}
          </Button>
        </form>
      </div>
    </div>
  );
}
