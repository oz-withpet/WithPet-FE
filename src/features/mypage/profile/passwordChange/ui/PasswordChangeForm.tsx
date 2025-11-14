"use client";

import { FormEvent, InvalidEvent, useRef } from "react";

export default function PasswordChangeForm() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  // 두 값이 같은지 확인하고, 일치하지 않으면 confirm에 에러 메시지 설정
  const validateMatch = () => {
    const pw = passwordRef.current?.value ?? "";
    const cpw = confirmRef.current?.value ?? "";
    if (!confirmRef.current) return;

    if (cpw && pw !== cpw) {
      confirmRef.current.setCustomValidity("비밀번호가 서로 일치하지 않습니다.");
    } else {
      confirmRef.current.setCustomValidity(""); // 초기화
    }
  };

  const onPwInput = (e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.setCustomValidity(""); // 기존 에러 초기화
    validateMatch(); // 비번 바뀌면 confirm도 재검증
  };

  const onConfirmInput = (e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.setCustomValidity(""); // 기존 에러 초기화
    validateMatch(); // 즉시 동일성 검사
  };

  const onConfirmInvalid = (e: InvalidEvent<HTMLInputElement>) => {
    // 제출 시 불일치면 메시지 표시 (validateMatch가 설정해둠)
    if (e.currentTarget.validationMessage === "") {
      e.currentTarget.setCustomValidity("비밀번호가 서로 일치하지 않습니다.");
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    validateMatch(); // 마지막으로 한 번 더 체크
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const fd = new FormData(form);
    const password = String(fd.get("password") ?? "");
    // TODO: 비번 변경 API 호출
    console.log("submit:", password);
  };

  return (
    <div className="flex w-wrapper items-center justify-center bg-orange-100 p-40 text-gray-900">
      <div className="flex w-edit flex-col rounded-xl border border-gray-300 p-3 hover:cursor-default">
        <div className="mb-9 flex w-full items-center justify-center p-3 text-2xl">
          {"닉네임"}님 비밀번호 변경
        </div>

        <form onSubmit={onSubmit} className="flex flex-col justify-between">
          <div className="my-2 flex flex-col">
            <div className="mb-3 text-lg">변경 비밀번호</div>
            <div className="flex w-full items-start justify-between">
              <div>
                <input
                  ref={passwordRef}
                  type="password"
                  name="password"
                  required
                  pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}" // 8자 이상 + 대/소문자 포함
                  title="8자 이상, 대문자/소문자 각각 1자 이상 포함"
                  onInput={onPwInput}
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
                  ref={confirmRef}
                  type="password"
                  name="confirm"
                  required
                  onInput={onConfirmInput}
                  onInvalid={onConfirmInvalid}
                  className="w-big rounded-xl border-2 border-orange-300 bg-white p-2.5 outline-none"
                  placeholder="위와 동일한 비밀번호를 입력해주세요."
                />
                <div className="text-sm text-gray-300">* 위 비밀번호와 동일하게 작성해주세요.</div>
              </div>
            </div>
          </div>
          <button
            type="submit" // ← submit 이어야 내장 검증이 트리거됨
            className="mt-5 rounded-lg bg-orange-300 px-4 py-2 font-semibold text-white hover:bg-orange-300"
          >
            비밀번호 변경
          </button>
        </form>
      </div>
    </div>
  );
}
