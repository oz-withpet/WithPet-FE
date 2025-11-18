"use client";

import Link from "next/link";

import { PostSummary } from "@/features/community/api/type";

type MainCardProps = Pick<PostSummary, "id" | "image_url" | "author" | "content">;

export default function RecommendedContentCard({
  id,
  // image_url,
  author,
  content,
}: MainCardProps) {
  return (
    <Link
      href={`/community/${id}`}
      className="relative my-2 flex w-big flex-col hover:cursor-pointer"
    >
      {/* {image_url ? (
        <Image
          src={image_url}
          alt={image_url}
          width={470}
          height={300}
          loading="eager"
          className="h-[300px] w-big rounded-2xl bg-orange-200 object-cover transition hover:scale-105 hover:cursor-pointer"
        />
      ) : ( */}
      <div className="h-[300px] w-big rounded-2xl bg-orange-200 object-cover transition hover:scale-105 hover:cursor-pointer" />
      {/* )} */}
      <div className="flex flex-col">
        <div className="mb-2 text-lg font-semibold">{content}</div>
        <div className="text-sm text-gray-400">{author.nickname || "nickname"}</div>
      </div>
    </Link>
  );
}
