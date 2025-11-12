"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import CommentForm from "@/components/common/comment/CommentForm";
import { getCategoryLabelSafe } from "@/components/common/modal/category";
import { DUMMY_POST_DETAILS } from "@/mocks/data/postDetails";
import { LikeSVG } from "@/shared/assets/icons/svgIcon";

export default function PostDetailPage() {
  const params = useParams();
  const data = DUMMY_POST_DETAILS.find((el) => el.id === Number(params.id));
  return (
    <div className="m-auto flex h-full w-main flex-col items-center text-gray-900">
      <div className="w-full border-b border-gray-200 py-2 text-3xl">
        {getCategoryLabelSafe(data?.category)}
      </div>
      <div className="flex w-full items-center justify-between border-b border-gray-200 py-2 text-lg">
        <div className="text-lg">{data?.title}</div>
        <div className="flex items-center">
          <Link
            href={`/community/edit/${params.id}`}
            className="rounded-full border-2 border-orange-300 bg-white px-5 py-1 text-sm hover:cursor-pointer hover:bg-orange-300 hover:font-semibold hover:text-white"
          >
            수정
          </Link>
          <div className="ml-4 rounded-full border-2 border-red-600 bg-white px-5 py-1 text-sm hover:cursor-pointer hover:bg-red-600 hover:font-semibold hover:text-white">
            삭제
          </div>
        </div>
      </div>

      <div className="w-full py-6 text-base">{data?.comment}</div>

      <div className="">
        {data?.image ? (
          <Image
            src={data?.image}
            width={300}
            height={300}
            alt={data.title ?? "image"}
            className="w-[300px] object-contain"
          />
        ) : (
          <div className="h-[300px] w-[300px] rounded bg-gray-100" aria-label="no image" />
        )}
      </div>
      <div className="py-9">
        <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 border-gray-300 hover:cursor-pointer hover:border-0 hover:bg-orange-300 hover:font-bold hover:text-white">
          <LikeSVG size="20" color="black" />
          {data?.likeCount}
        </div>
      </div>

      <div className="flex w-full">
        {data?.user.thumbnail ? (
          <Image
            src={data?.user.thumbnail}
            width={40}
            height={40}
            alt={data.title ?? "image"}
            className="mr-2 rounded-full"
          />
        ) : (
          <div className="h-[30px] w-[30px] rounded bg-gray-100" aria-label="no image" />
        )}
        <div className="flex flex-col">
          <div className="font-bold">{data?.user.name}</div>
          <div className="text-sm text-gray-500">{data?.createdAt}</div>
        </div>
      </div>
      <CommentForm />
    </div>
  );
}
