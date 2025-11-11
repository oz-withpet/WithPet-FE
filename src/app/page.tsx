import MainCard from "@/components/common/cards/MainCard";

export default function Home() {
  return (
    <div className="m-auto flex w-main flex-col items-center pt-12 text-gray-900">
      <div className="text-2xl font-semibold">추천 콘텐츠</div>
      <div className="flex flex-wrap justify-between">
        {Array(10)
          .fill("")
          .map((el, i) => (
            <MainCard key={i} writer={"글쓴이"} comment={"고양이 데리고 가실 분"} />
          ))}
      </div>
    </div>
  );
}
