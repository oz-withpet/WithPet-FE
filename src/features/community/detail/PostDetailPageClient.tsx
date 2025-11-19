"use client";

import PostDetailShell from "./PostDetailShell";
import { usePostDetailQuery } from "../api/usePostDetailQuery";

type Props = { id: string };

// 클라이언트 컴포넌트
export default function PostDetailPageClient({ id }: Props) {
  // 화면을 보게 한다.
  const { data, isLoading, isError } = usePostDetailQuery({ post_id: id, include: "comments" });

  // 로딩
  if (isLoading) {
    return <div className="mx-auto w-main py-8">게시글을 불러오는 중입니다...</div>;
  }
  // 에러
  if (isError || !data) {
    return <div className="mx-auto w-main py-8">게시글을 불러오지 못했습니다.</div>;
  }

  return <PostDetailShell post={data.post} comments={data?.comments} />;
}
