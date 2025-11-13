import PostItem from "@/components/common/cards/PostItem";

export default function ReportedPostsShell() {
  return (
    <div className="mx-wrapper flex h-[700px] w-wrapper flex-col items-center justify-center">
      <div className="border-1 flex h-[650px] flex-col items-center text-gray-900">
        {Array(4)
          .fill("")
          .map((el, i) => (
            <PostItem
              key={i}
              category="FREE"
              title="신고된 게시글 제목"
              content="신고된 게시글 내용"
              user={{ thumbnail: "/images/sample/profile1.png", name: "작성자" }}
              id={i}
              image={["/images/sample/post1.png"]}
              liked={false}
              commentNum={0}
              createdAt="2023-06-01T12:00:00Z"
            />
          ))}
      </div>
    </div>
  );
}
