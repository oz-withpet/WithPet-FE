import { Categories, CategoryLabel } from "@/types/category";

export type PostSummary = {
  id: string;
  author: {
    user_id: string;
    nickname: string;
  };
  category: Categories;
  comment_count: number;
  content_snippet: string;
  title: string;
  image_url: string;
  is_liked_by_me: boolean;
  like_count: number;
  created_at: string;
  updated_at: string;
  view_count: number;
};

export type GetPostsResponse = {
  posts: PostSummary[];
  has_next: boolean;
  next_after: string;
};

export type GetPostsParams = {
  view?: "main" | "community"; // "main"
  after?: string; // 커서
  limit?: number; // 12
  category?: CategoryLabel;
};

export type GetPostDetailParams = {
  id: string;
  include?: "comments";
  comments_limit?: number; // 20
  comments_after?: string; // cmt_cursor_20251021_030600
};

export type PostDetailSummary = {
  id: string;
  title: string;
  content: string;
  category: Categories;
  image_url: string;
  images: string[];
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

export type GetPostDetailResponse = {
  post: PostDetailSummary;
};
