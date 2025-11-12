"use client";

import { notFound, useRouter, useParams } from "next/navigation";

import { DUMMY_POST_DETAILS } from "@/mocks/data/postDetails";
import { PostFormValues } from "@/types/community";

import PostForm from "../post/PostForm";

// 임시방편
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toFormValues(detail: any): PostFormValues {
  return {
    title: detail.title ?? "",
    comment: detail.comment ?? "",
    category: detail.category ?? "free",
    images: detail.image ? [detail.image] : [],
  };
}

export default function EditPostForm() {
  const router = useRouter();
  const params = useParams();
  // const { id } = param; // 실제 api 사용시
  const detail = DUMMY_POST_DETAILS.find((p) => String(p.id) === params.id);
  if (!detail) return notFound();

  const initial = toFormValues(detail);

  return (
    <PostForm
      mode="edit"
      postId={String(params.id)}
      initialValues={initial}
      onSubmit={async () => {
        // await updatePost(id, v);
        router.replace(`/community/${String(params.id)}`);
      }}
      onDelete={async () => {
        // await deletePost(id);
        router.replace(`/community`);
      }}
      submitLabel="수정하기"
    />
  );
}
