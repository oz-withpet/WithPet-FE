"use client";

import Image from "next/image";
import Link from "next/link";

import { toRelativeKorean } from "@/lib/relativeTime";

import { getCategoryLabelSafe } from "../modal/category";

type PostItemProps = {
  id: number;
  category: string;
  title: string;
  content: string;
  images: string[];
  user: {
    thumbnail: string;
    name: string;
  };
  liked: boolean;
  commentNum: number;
  createdAt: string;
};

export default function PostItem(pr: PostItemProps) {
  return (
    <Link
      href={`/community/${pr.id}`}
      className="my-2 flex w-main cursor-pointer flex-col rounded-sm bg-gray-100 hover:scale-105"
    >
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex w-[838px] items-center justify-between">
            <div className="text-2xl font-semibold text-black">
              {getCategoryLabelSafe(pr.category)}
            </div>
          </div>
          <div className="mt-3">
            <div className="mb-2 text-lg font-bold text-black">{pr.title}</div>
            <div className="line-clamp-2 h-[42px] w-[838px] text-sm text-gray-400">
              {pr.content}
            </div>
          </div>
        </div>
        <Image
          src={pr.images[0]}
          alt={pr.title}
          width={124}
          height={124}
          className="h-[124px] w-[124px] rounded-xl bg-thumbnail-200 text-gray-400"
        />
      </div>
      <div className="flex items-center text-xs text-gray-400">
        <div className="flex items-center p-2">
          <Image
            src={pr.user.thumbnail}
            alt={pr.title}
            width={16}
            height={16}
            className="rounded-full"
          />
          <div className="ml-1">{pr.user.name}</div>
        </div>
        <div className="mx-3 p-2">댓글: {pr.commentNum}</div>
        <div className="p-2">{toRelativeKorean(pr.createdAt)}</div>
      </div>
    </Link>
  );
}
