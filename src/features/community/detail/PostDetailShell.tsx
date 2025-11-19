"use client";

import Image from "next/image";
import Link from "next/link";

import CommentForm from "@/components/common/comment/CommentForm";
import { toRelativeKorean } from "@/lib/relativeTime";
import { LikeSVG } from "@/shared/assets/icons/svgIcon";

import type { CommentResponse, PostDetailSummary } from "../api/type";

type Props = {
  post: Omit<
    PostDetailSummary,
    "images" | "updated_at" | "view_count" | "comment_count" | "is_liked_by_me"
  >;
  comments: CommentResponse;
};

export default function PostDetailShell({ post, comments }: Props) {
  return (
    <div className="m-auto flex h-full w-main flex-col items-center text-gray-900">
      <div className="w-full border-b border-gray-200 py-2 text-3xl">{post?.category}</div>
      <div className="flex w-full items-center justify-between border-b border-gray-200 py-2 text-lg">
        <div className="text-lg">{post?.title}</div>
        <div className="flex items-center">
          <Link
            href={`/community/${post?.id}/edit`}
            className="rounded-full border-2 border-orange-300 bg-white px-5 py-1 text-sm hover:cursor-pointer hover:bg-orange-300 hover:font-semibold hover:text-white"
          >
            수정
          </Link>
          <button className="ml-4 rounded-full border-2 border-red-600 bg-white px-5 py-1 text-sm hover:cursor-pointer hover:bg-red-600 hover:font-semibold hover:text-white">
            삭제
          </button>
        </div>
      </div>

      <div className="w-full py-6 text-base">{post.content}</div>

      <div className="">
        {post.image_url ? (
          <Image
            src={post?.image_url}
            alt={post?.title}
            width={300}
            height={300}
            loading="lazy"
            className="mb-3 w-[300px] object-contain"
          />
        ) : (
          <div className="h-[300px] w-[300px] rounded bg-gray-100" aria-label="no image" />
        )}
      </div>
      <div className="py-9">
        <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 border-gray-300 hover:cursor-pointer hover:border-0 hover:bg-orange-300 hover:font-bold hover:text-white">
          <LikeSVG size="20" color="black" />
          {post?.like_count}
        </div>
      </div>

      <div className="flex w-full items-center">
        <div className="h-[30px] w-[30px] rounded bg-orange-300" aria-label="no image" />
        <div className="ml-3 flex flex-col">
          <div className="font-bold">{post?.author.nickname || "nickname"}</div>
          <div className="text-sm text-gray-500">{toRelativeKorean(post?.created_at)}</div>
        </div>
      </div>

      <CommentForm items={comments?.items} />
    </div>
  );
}
