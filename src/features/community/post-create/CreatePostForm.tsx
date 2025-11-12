"use client";

import { PostFormValues } from "@/types/community";

import PostForm from "../post/PostForm";

export default function CreatePostForm() {
  // const router = useRouter();

  const onSubmit = async (v: PostFormValues) => {
    // const id = await createPost(v) // api
    // router.replace(`/community/${id}`);
  };

  return <PostForm mode="create" onSubmit={onSubmit} />;
}
