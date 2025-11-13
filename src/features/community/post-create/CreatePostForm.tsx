"use client";

import { PostFormValues } from "@/types/community";

import PostForm from "../post/PostForm";

export default function CreatePostForm() {
  const onSubmit = async (values: PostFormValues) => {
    // 서버로 보낼 FormData 구성 (예시)
    const fd = new FormData();
    fd.append("title", values.title);
    fd.append("content", values.content);
    fd.append("category", values.category);
    // 기존 보존할 이미지(URL/ID)
    values.keepImages?.forEach((u) => fd.append("keepImages[]", u));

    // 새로 업로드할 파일들
    values.images?.forEach((f) => fd.append("newImages", f));

    // 실제 API 경로로 교체
    await fetch("/api/posts", { method: "POST", body: fd });
  };

  return <PostForm mode="create" onSubmit={onSubmit} />;
}
