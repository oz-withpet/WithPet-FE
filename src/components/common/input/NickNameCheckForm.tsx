"use client";

import { useRef, useState, type FormEvent, type InvalidEvent } from "react";

type Props = {
  currentNickname: string; // 현재 닉네임 (서버/세션에서 주입)
  // onCheck: (nickname: string) => void; // 중복 확인 요청 트리거(네트워크 호출)
};

const KOREAN_NICKNAME_PATTERN = "^[가-힣]{2,16}$"; // 한글 2–16자 (공백/특수문자 금지)

const norm = (s: string) => s.normalize("NFC").trim();

export default function NicknameCheckForm({
  currentNickname,
  //  onCheck
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState(false);

  // 동일성 포함 종합 검사: invalid message를 input에 설정
  const validateAll = () => {
    const el = inputRef.current!;
    const value = norm(el.value);
    el.setCustomValidity(""); // 초기화

    if (value.length === 0) {
      el.setCustomValidity("닉네임을 입력해주세요.");
      return;
    }
    // pattern은 브라우저가 검사하지만, 메시지를 더 친절하게 하고 싶으면 다음 줄 유지
    if (!new RegExp(KOREAN_NICKNAME_PATTERN).test(value)) {
      el.setCustomValidity("닉네임은 한글 2–16자로 입력해주세요.");
      return;
    }
    if (value === norm(currentNickname)) {
      el.setCustomValidity("기존 닉네임과 동일합니다. 다른 닉네임을 입력해주세요.");
      return;
    }
  };

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.setCustomValidity(""); // 입력 시 기존 에러 제거
    validateAll(); // 즉시 피드백
  };

  const onInvalid = (e: InvalidEvent<HTMLInputElement>) => {
    // 브라우저 기본 메시지 대신 우리 메시지로 치환
    if (e.currentTarget.validity.valueMissing) {
      e.currentTarget.setCustomValidity("닉네임을 입력해주세요.");
    } else if (e.currentTarget.validity.patternMismatch) {
      e.currentTarget.setCustomValidity("닉네임은 한글 2–16자로 입력해주세요.");
    }
    // 동일성은 validateAll에서 이미 설정됨
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateAll(); // 마지막으로 한 번 더 체크
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // const nickname = norm(inputRef.current!.value);
    try {
      setPending(true);
      // onCheck(nickname); // ← 여기서만 네트워크 호출
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full items-start justify-between">
      <input
        ref={inputRef}
        type="text"
        name="nickname"
        required
        pattern={KOREAN_NICKNAME_PATTERN}
        placeholder="변경할 닉네임을 작성해주세요."
        onInput={onInput}
        onInvalid={onInvalid}
        className="w-[330px] rounded-xl border-2 border-orange-300 bg-white p-2.5 outline-none"
        title="닉네임은 한글 2–16자로 입력"
        autoComplete="nickname"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg border-2 border-orange-300 bg-white p-2.5 font-semibold hover:cursor-pointer hover:bg-orange-300 hover:text-white"
      >
        중복 확인
      </button>
    </form>
  );
}
