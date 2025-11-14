import Link from "next/link";

export default function CommunityNotFound() {
  return (
    <div className="mx-auto flex w-main flex-col items-center justify-center py-16 text-center">
      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        찾을 수 없는 커뮤니티 페이지입니다.
      </h2>
      <p className="mb-6 text-sm text-gray-500">잘못된 주소이거나 삭제된 게시글일 수 있어요.</p>
      <Link
        href="/community/category/all"
        className="rounded-2xl border border-orange-400 px-5 py-2 text-sm font-medium text-orange-500 hover:bg-orange-50"
      >
        커뮤니티 메인으로 돌아가기
      </Link>
    </div>
  );
}
