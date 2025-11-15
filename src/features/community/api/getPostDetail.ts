// src/features/community/api/getPosts.ts
import { get } from "@/shared/api/serverClient";

export type PostSummary = {
  // Swagger 응답 보고 맞춰서 수정하면 됨
  id: string;
  title: string;
  content: string;
  category: "free" | "qna" | "info";
  image_url: string;
  author: {
    user_id: string;
    nickname: string;
  };
  created_at: string;
  updated_at: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  is_liked_by_me: boolean;
};

export type GetPostResponse = {
  post: PostSummary[];
};

export type GetPostsParams = {
  include?: "comments";
  comments_limit?: number; // 20
  comments_after?: string; // cmt_cursor_20251021_030600
};

export async function getPostDetail(params: GetPostsParams = {}) {
  const { comments_limit, comments_after } = params;
  const postId = "MTIzNDU2Nzg5MDEyMw%3D%3D"; // 예시 postId, 실제로는 함수 인자로 받아야 함
  const data = await get<GetPostResponse>(`/posts/${postId}`, {
    query: {
      include: "comments",
      comments_limit,
      comments_after,
    },
  });

  return data;
}
