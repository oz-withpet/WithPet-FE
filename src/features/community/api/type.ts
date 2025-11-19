import { Categories, CategoryLabel } from "@/types/category";

export type PostSummary = {
  id: string;
  author: {
    user_id: string;
    nickname: string;
  };
  category: Categories;
  comment_count: number;
  content: string;
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
  post_id: string;
  include?: "comments" | "";
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
export type CommentItemSummary = {
  id: number;
  author: {
    user_id: number;
    nickname: string;
  };
  content: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
};
export type CommentResponse = {
  items: CommentItemSummary[];
  total_count: number;
  has_next: boolean;
  next_after: string | null;
};

export type GetPostDetailResponse = {
  post: PostDetailSummary;
  comments: CommentResponse;
};
