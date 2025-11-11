import PostItem from "@/components/common/cards/PostItem";

export default function ReportedPostsShell() {
  return (
    <div className="mx-wrapper flex h-[700px] w-wrapper flex-col items-center justify-center">
      <div className="border-1 flex h-[650px] flex-col items-center text-gray-900">
        {Array(4)
          .fill("")
          .map((el, i) => (
            <PostItem
              category="자유게시판"
              title="제목"
              content="블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라"
              user="작성자"
              comment={0}
              ago={0}
              key={i}
            />
          ))}
      </div>
    </div>
  );
}
