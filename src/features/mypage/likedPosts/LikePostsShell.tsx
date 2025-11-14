import LikeCard from "@/components/common/cards/LikeCard";

export default function LikePostsShell() {
  return (
    <div className="mx-wrapper flex h-[750px] w-wrapper flex-col items-center justify-center bg-orange-100">
      <div className="border-1 flex h-[700px] flex-wrap items-center justify-around border-gray-950 text-gray-900">
        {Array(8)
          .fill("")
          .map((el, i) => (
            <LikeCard
              title="제목"
              content="블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라"
              key={i}
              comment={0}
              day={2}
              user="작성자"
            />
          ))}
      </div>
    </div>
  );
}
