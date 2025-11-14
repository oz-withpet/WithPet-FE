"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RootError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center">
      <h2 className="mb-3 text-xl font-semibold text-gray-900">
        메인 페이지에서 오류가 발생했어요.
      </h2>
      <p className="mb-6 text-sm text-gray-500">
        일시적인 문제일 수 있어요. 아래 버튼을 눌러 다시 시도해 주세요.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-2xl bg-orange-500 px-6 py-2 text-sm font-semibold text-white hover:bg-orange-600"
      >
        다시 시도
      </button>
    </div>
  );
}
