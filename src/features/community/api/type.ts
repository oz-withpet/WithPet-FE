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

export type GetPostDetailResponse = {
  post: PostDetailSummary;
};

export type CommunityPostSummary = {
  id: string;
  // category: "free" | "qna" | "info";
  title: string;
  image_url: string;
  author: {
    user_id: string;
    nickname: string;
  };
};

export type GetPostsResponse = {
  posts: CommunityPostSummary[];
  has_next: boolean;
  next_after: string;
};

export type GetPostsParams = {
  view?: "main" | "community"; // "main"
  after?: string; // 커서
  limit?: number; // 12
};
