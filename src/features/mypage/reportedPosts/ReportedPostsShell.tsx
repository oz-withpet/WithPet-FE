import PostItem from "@/components/common/cards/PostItem";

export default function ReportedPostsShell() {
  return (
    <div className="mx-wrapper flex h-[700px] w-wrapper flex-col items-center justify-center">
      <div className="border-1 flex h-[650px] flex-col items-center text-gray-900">
        {Array(4)
          .fill("")
          .map((el) => (
            <PostItem
              key={el.id}
              id={"1"}
              category="자유게시판"
              title="신고된 게시글 제목"
              content_snippet="신고된 게시글 내용"
              author={{ nickname: "닉네임", user_id: "작성자" }}
              image_url={"/images/sample/post1.png"}
              comment_count={0}
              created_at="2023-06-01T12:00:00Z"
            />
          ))}
      </div>
    </div>
  );
}
