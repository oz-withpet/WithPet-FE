import PickCard from "@/components/common/cards/PickCard";

export default function SavePlaceShell() {
  return (
    <div className="mx-wrapper flex h-[700px] w-wrapper flex-col items-center justify-center">
      <div className="border-1 flex h-[650px] flex-wrap items-center justify-around text-gray-900">
        {Array(8)
          .fill("")
          .map((el, i) => (
            <PickCard
              title="가게명"
              phone="010-0000-0000"
              address="서울특별시 종로구 청운효자동"
              key={i}
            />
          ))}
      </div>
    </div>
  );
}
