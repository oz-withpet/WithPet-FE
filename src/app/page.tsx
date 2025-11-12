import MainCard from "@/components/common/cards/MainCard";
import { DUMMY_MAIN_POSTS } from "@/mocks/data/post";

export default function Home() {
  return (
    <div className="m-auto flex w-main flex-col items-center pt-12 text-gray-900">
      <div className="text-2xl font-semibold">추천 콘텐츠</div>
      <div className="flex flex-wrap justify-between">
        {DUMMY_MAIN_POSTS?.map((el) => (
          <MainCard key={el.id} {...el} />
        ))}
      </div>
    </div>
  );
}
