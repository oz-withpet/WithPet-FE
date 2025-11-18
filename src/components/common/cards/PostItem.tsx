"use client";

import Link from "next/link";

import { PostSummary } from "@/features/community/api/type";
import { toRelativeKorean } from "@/lib/relativeTime";

export default function PostItem(
  pr: Omit<PostSummary, "updated_at" | "view_count" | "like_count" | "is_liked_by_me">,
) {
  return (
    <Link
      href={`/community/${pr.id}`}
      className="my-2 flex w-main cursor-pointer flex-col rounded-sm bg-gray-100 hover:scale-105"
    >
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex w-[838px] items-center justify-between">
            <div className="text-2xl font-semibold text-black">{pr?.category}</div>
          </div>
          <div className="mt-3">
            <div className="mb-2 text-lg font-bold text-black">{pr?.title}</div>
            <div className="line-clamp-2 h-[42px] w-[838px] text-sm text-gray-400">
              {pr.content_snippet}
            </div>
          </div>
        </div>
        {/* {pr?.image_url ? ( */}
        <div className="h-[124px] w-[124px] rounded-xl bg-thumbnail-200 text-gray-400" />
        {/* ) : (
          <Image
            src={pr?.image_url}
            alt={pr?.title}
            width={124}
            height={124}
            loading="eager"
            className="h-[124px] w-[124px] rounded-xl bg-thumbnail-200 text-gray-400"
          />
        )} */}
      </div>
      <div className="flex items-center text-xs text-gray-400">
        <div className="flex items-center p-2">
          <div className="h-[16px] w-[16px] rounded-full bg-orange-300" />
          <div className="ml-1">{pr?.author.nickname}</div>
        </div>
        <div className="mx-3 p-2">댓글: {pr?.comment_count}</div>
        <div className="p-2">{toRelativeKorean(pr?.created_at)}</div>
      </div>
    </Link>
  );
}
