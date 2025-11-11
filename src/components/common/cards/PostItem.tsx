"use client";

import { usePathname } from "next/navigation";

import { LikeSVG, UserSVG } from "@/shared/assets/icons/svgIcon";

type PostItemProps = {
  category: string;
  title: string;
  content: string;
  user: string;
  comment: number;
  ago: number;
};
type PathnameQuery = { query: string };

export default function PostItem({ category, title, content, comment, user, ago }: PostItemProps) {
  const pathname = usePathname();
  const pathnameCheck = ({ query }: PathnameQuery) => pathname.includes(query);

  return (
    <div className="my-2 flex w-main flex-col rounded-sm bg-gray-100">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex w-[838px] items-center justify-between">
            <div className="text-2xl font-semibold text-black">{category}</div>
            {pathnameCheck({ query: "category" }) && (
              <div className="flex items-center rounded-3xl border-2 border-orange-300 bg-white px-6 py-1 text-sm font-semibold text-gray-900 hover:cursor-pointer hover:bg-orange-300 hover:text-white">
                <div className="mr-1">좋아요</div>
                <LikeSVG size="20" color="black" />
              </div>
            )}
          </div>
          <div className="mt-3">
            <div className="mb-2 text-lg font-bold text-black">{title}</div>
            <div className="line-clamp-2 h-[42px] w-[838px] text-sm text-gray-400">{content}</div>
          </div>
        </div>
        <div className="h-[124px] w-[124px] rounded-xl bg-thumbnail-200 text-gray-400" />
      </div>
      <div className="flex items-center text-xs text-gray-400">
        <div className="flex items-center p-2">
          <UserSVG size="16" />
          <div className="ml-1">{user}</div>
        </div>
        <div className="mx-3 p-2">댓글: {comment}</div>
        <div className="p-2">{ago}일 전</div>
      </div>
    </div>
  );
}
