import Link from "next/link";

export default function MyPageNotFound() {
  return (
    <div className="mx-auto flex w-main flex-col items-center justify-center py-16 text-center">
      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        존재하지 않는 마이페이지 경로입니다.
      </h2>
      <p className="mb-6 text-sm text-gray-500">
        잘못된 메뉴를 선택했거나 URL이 변경되었을 수 있어요.
      </p>
      <Link
        href="/mypage/profile"
        className="rounded-2xl border border-orange-400 px-5 py-2 text-sm font-medium text-orange-500 hover:bg-orange-50"
      >
        마이페이지 홈으로 돌아가기
      </Link>
    </div>
  );
}
