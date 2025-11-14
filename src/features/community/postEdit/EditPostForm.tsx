"use client";

import { useMemo } from "react";

import { useParams } from "next/navigation";

import { toInitialValues } from "@/lib/toInitialValues";
import { DUMMY_POST_DETAILS } from "@/mocks/data/postDetails";
import type { PostFormValues } from "@/types/community";

import PostForm from "../postList/PostForm";

export default function Page() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const initialValues = useMemo(() => {
    const detail = DUMMY_POST_DETAILS.find((p) => p.id === id);
    return toInitialValues(detail ?? {});
  }, [id]);

  const onSubmit = async (values: PostFormValues) => {
    const fd = new FormData();
    fd.append("title", values.title);
    fd.append("content", values.content);
    fd.append("category", values.category);
    values.keepImages?.forEach((u) => fd.append("keepImages[]", u));
    values.images?.forEach((f) => fd.append("newImages", f));

    await fetch(`/api/posts/${id}`, { method: "PUT", body: fd });
  };

  const onDelete = async () => {
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    // 라우팅 등 후처리
  };

  return (
    <PostForm mode="edit" initialValues={initialValues} onSubmit={onSubmit} onDelete={onDelete} />
  );
}
