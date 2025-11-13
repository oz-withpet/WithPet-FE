import { DUMMY_POST_DETAILS } from "@/mocks/data/postDetails";
import { Category } from "@/types/category";

import PostItem from "../../../components/common/cards/PostItem";
import EmptyState from "../EmptyState";

export default function CommunityShell({ category }: { category: Category }) {
  return (
    <div className="mx-auto flex w-main flex-col items-center">
      <div className="flex w-main flex-col items-center">
        {DUMMY_POST_DETAILS.length ? (
          <>
            {DUMMY_POST_DETAILS.map((el) => (
              <PostItem key={el.id} {...el} />
            ))}
          </>
        ) : (
          <EmptyState content="게시글 없습니다." />
        )}
      </div>
    </div>
  );
}
