import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center">
      <h1 className="mb-2 text-2xl font-bold text-gray-900">페이지를 찾을 수 없어요</h1>
      <p className="mb-6 text-sm text-gray-500">주소가 잘못되었거나, 이동되었을 수 있어요.</p>
      <Link
        href="/"
        className="rounded-2xl border border-orange-400 px-5 py-2 text-sm font-medium text-orange-500 hover:bg-orange-50"
      >
        메인 페이지로 돌아가기
      </Link>
    </div>
  );
}
