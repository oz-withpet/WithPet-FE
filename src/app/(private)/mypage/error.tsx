"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function MyPageError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex w-main flex-col items-center justify-center py-16 text-center">
      <h2 className="mb-3 text-xl font-semibold text-gray-900">
        마이페이지에서 오류가 발생했어요.
      </h2>
      <p className="mb-6 text-sm text-gray-500">
        네 정보나 게시글을 불러오는 중 문제가 생겼습니다. 다시 시도해주세요.
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
