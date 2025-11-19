import Image from "next/image";
import Link from "next/link";

import { toRelativeKorean } from "@/lib/relativeTime";
import { LikeSVG, UserSVG } from "@/shared/assets/icons/svgIcon";
import { MyPostSummary } from "@/types/mypage";

type LikeCardProp = Pick<
  MyPostSummary,
  "id" | "title" | "content" | "comment_count" | "created_at" | "author" | "image_url"
>;

export default function LikeCard({
  id,
  image_url,
  title,
  content,
  comment_count,
  created_at,
  author,
}: LikeCardProp) {
  return (
    <Link href={`/community/${id}`} className="m-2 flex h-[315px] w-[230px] flex-col bg-orange-100">
      <Image
        src={image_url}
        alt={title}
        loading="lazy"
        width={230}
        height={180}
        className="h-[180px] w-[230px] rounded-xl bg-orange-300"
      />
      <div className="flex items-center justify-between py-3">
        <div className="truncate text-xl font-semibold text-gray-900 hover:cursor-default">
          {title}
        </div>
        <div className="flex h-8 w-10 items-center justify-center rounded-3xl bg-orange-300">
          <LikeSVG size="20" color="white" />
        </div>
      </div>
      <div className="h-[42px] w-full overflow-hidden overflow-ellipsis text-sm text-gray-500 hover:cursor-default">
        {content}
      </div>
      <div className="flex items-center justify-between py-3 text-xs hover:cursor-default">
        <div className="flex items-center">
          <UserSVG size="16" color="#CFCECE" />
          <div className="ml-1">{author?.nickname || "nickname"}</div>
        </div>
        <div>댓글: {comment_count}</div>
        <div>{toRelativeKorean(created_at)}</div>
      </div>
    </Link>
  );
}
