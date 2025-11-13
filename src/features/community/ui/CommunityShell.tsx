import { Category } from "@/types/category";

import PostItem from "../../../components/common/cards/PostItem";

export default function CommunityShell({ category }: { category: Category }) {
  return (
    <div className="mx-auto flex w-main flex-col items-center">
      <div className="flex w-main flex-col items-center">
        {Array(4)
          .fill("")
          .map((el) => (
            <PostItem
              key={el}
              category={category}
              title="제목"
              content=""
              user="작성자"
              comment={0}
              ago={0}
            />
          ))}
        {/* <EmptyState /> 게시글 없거나 검색 결과 없을 경우 props로 활용*/}
      </div>
    </div>
  );
}
