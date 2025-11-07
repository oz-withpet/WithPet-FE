import { Pagination } from "@mui/material";

import { searchIconSVG } from "@/shared/assets/icons/community/svgIcon";
import { CommunityCategory } from "@/types/community";

import PostItem from "../category/PostItem";

export default function CommunityShell({ category }: { category: CommunityCategory }) {
  return (
    <div className="w-main mx-auto flex flex-col items-center">
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
          <div className="flex h-[48px] w-[480px] items-center rounded-xl border-2 border-orange-300 p-3">
            <div className="mr-2">{searchIconSVG({ size: "24", color: "#000" })}</div>
            <input
              type="text"
              className="h-[35px] w-[420px] text-black outline-none"
              placeholder="검색할 제목을 작성해주세요."
            ></input>
          </div>
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

      <div className="w-main flex flex-col items-center">
        {Array(4)
          .fill("")
          .map((el) => (
            <PostItem key={el} title={category} />
          ))}
        {/* <EmptyState /> 게시글 없거나 검색 결과 없을 경우 props로 활용*/}
      </div>

      <div className="my-10">
        <Pagination count={10} />
      </div>
    </div>
  );
}
