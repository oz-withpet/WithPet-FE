export default function CommunityLoading() {
  return (
    <div className="mx-auto flex w-main items-center justify-center py-12">
      <div className="flex items-center gap-3 text-gray-500">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-orange-300 border-t-transparent" />
        <span>커뮤니티 데이터를 불러오는 중입니다…</span>
      </div>
    </div>
  );
}
