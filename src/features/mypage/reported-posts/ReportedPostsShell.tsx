import PostItem from "@/components/common/cards/PostItem";

export default function ReportedPostsShell() {
  return (
    <div className="mx-wrapper flex h-[700px] w-wrapper flex-col items-center justify-center">
      <div className="border-1 flex h-[650px] flex-col items-center text-gray-900">
        {Array(4)
          .fill("")
          .map((el, i) => (
            <PostItem title="가게명" key={i} />
          ))}
      </div>
    </div>
  );
}
