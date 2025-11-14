export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3 text-gray-600">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-300 border-t-transparent" />
        <p className="text-sm">메인 화면을 불러오는 중입니다…</p>
      </div>
    </div>
  );
}
