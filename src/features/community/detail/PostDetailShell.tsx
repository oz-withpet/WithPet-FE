"use client";

import Image from "next/image";
import Link from "next/link";

import CommentForm from "@/components/common/comment/CommentForm";
import { getCategoryLabelSafe } from "@/components/common/modal/category";
import { LikeSVG } from "@/shared/assets/icons/svgIcon";

import type { PostDetailSummary } from "../api/type";

type Props = Pick<
  PostDetailSummary,
  "id" | "title" | "content" | "category" | "image_url" | "like_count" | "author" | "created_at"
>;

export default function PostDetailShell({
  id,
  title,
  content,
  category,
  image_url,
  like_count,
  author,
  created_at,
}: Props) {
  return (
    <div className="m-auto flex h-full w-main flex-col items-center text-gray-900">
      <div className="w-full border-b border-gray-200 py-2 text-3xl">
        {getCategoryLabelSafe(category)}
      </div>
      <div className="flex w-full items-center justify-between border-b border-gray-200 py-2 text-lg">
        <div className="text-lg">{title}</div>
        <div className="flex items-center">
          <Link
            href={`/community/${id}/edit`}
            className="rounded-full border-2 border-orange-300 bg-white px-5 py-1 text-sm hover:cursor-pointer hover:bg-orange-300 hover:font-semibold hover:text-white"
          >
            수정
          </Link>
          <button className="ml-4 rounded-full border-2 border-red-600 bg-white px-5 py-1 text-sm hover:cursor-pointer hover:bg-red-600 hover:font-semibold hover:text-white">
            삭제
          </button>
        </div>
      </div>

      <div className="w-full py-6 text-base">{content}</div>

      <div className="">
        {image_url ? (
          <Image
            src={image_url}
            alt={title ?? "image"}
            width={300}
            height={300}
            loading="eager"
            className="mb-3 w-[300px] object-contain"
          />
        ) : (
          <div className="h-[300px] w-[300px] rounded bg-gray-100" aria-label="no image" />
        )}
      </div>
      <div className="py-9">
        <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 border-gray-300 hover:cursor-pointer hover:border-0 hover:bg-orange-300 hover:font-bold hover:text-white">
          <LikeSVG size="20" color="black" />
          {like_count}
        </div>
      </div>

      <div className="flex w-full">
        <div className="h-[30px] w-[30px] rounded bg-gray-100" aria-label="no image" />
        <div className="flex flex-col">
          <div className="font-bold">{author.nickname}</div>
          <div className="text-sm text-gray-500">{created_at}</div>
        </div>
      </div>
      <CommentForm />
    </div>
  );
}
