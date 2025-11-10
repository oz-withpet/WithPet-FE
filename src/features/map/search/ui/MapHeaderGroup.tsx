export default function MapHeaderGroup() {
  return (
    <>
      <div className="mb-2 flex items-center justify-between font-semibold text-gray-900">
        <h2 className="text-xl">위치 찾기</h2>
        <button className="text-base">현 위치</button>
      </div>
      <p className="mb-1 text-sm text-gray-400">시도/시군구 까지 입력이 필요합니다.</p>
    </>
  );
}
