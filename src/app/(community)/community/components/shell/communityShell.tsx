import PostItem from "../../../../../components/community/PostItem";

export type CommunityCategory = "all" | "free" | "qna" | "info";

export function CommunityShell({ category }: { category: CommunityCategory }) {
  return (
    <div className="w-main mx-auto flex flex-col">
      <div className="flex w-full items-center justify-center p-6">
        <div className="w-main flex items-center justify-center">
          <select
            name="filterType"
            className="mx-2 h-[40px] w-[125px] rounded-xl border-2 border-orange-300 px-2 text-sm text-black outline-none"
          >
            <option value="">제목, 내용 선택</option>
            <option value="title">제목</option>
            <option value="content">내용</option>
          </select>
          <input
            type="text"
            className="h-[48px] w-[480px] rounded-xl border-2 border-orange-300 p-3 text-black outline-none"
          ></input>
        </div>
      </div>

      <div className="w-main flex items-center py-4">
        <div className="flex max-w-main items-center">
          <label className="mr-4 flex cursor-pointer items-center text-gray-400">
            <input
              type="radio"
              name="sort"
              value="latest"
              defaultChecked
              className="mr-2 h-4 w-4 accent-orange-300"
            />
            최신순
          </label>
          <label className="mr-4 flex cursor-pointer items-center text-gray-400">
            <input
              type="radio"
              name="sort"
              value="popular"
              className="mr-2 h-4 w-4 accent-orange-300"
            />
            인기순
          </label>
          <label className="mr-4 flex cursor-pointer items-center text-gray-400">
            <input
              type="radio"
              name="sort"
              value="views"
              className="mr-2 h-4 w-4 accent-orange-300"
            />
            조회순
          </label>
        </div>
      </div>

      <div className="w-main flex h-[887px] flex-col items-center">
        {Array(4)
          .fill("")
          .map((el) => (
            <PostItem key={el} title={category} />
          ))}
      </div>
    </div>
  );
}
