"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function CommunityError({ error, reset }: Props) {
  useEffect(() => {
    // TODO: 에러 로깅 도입 시 여기서 Sentry 등으로 보낼 수 있음
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex w-main flex-col items-center justify-center py-16 text-center">
      <h2 className="mb-3 text-xl font-semibold text-gray-900">
        커뮤니티 페이지에서 오류가 발생했어요.
      </h2>
      <p className="mb-6 text-sm text-gray-500">
        잠시 후 다시 시도해주세요. 문제가 지속되면 제보 부탁드립니다.
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
