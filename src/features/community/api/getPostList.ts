// import { get } from "@/shared/api/serverClient";

export type PostSummary = {
  // Swagger 응답 보고 맞춰서 수정하면 됨
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
  posts: PostSummary[];
  has_next: boolean;
  next_after: string;
};

export type GetPostsParams = {
  view?: "main" | "community"; // "main"
  after?: string; // 커서
  limit?: number; // 12
};

export async function getPosts(params: GetPostsParams = {}) {
  // view: 'main' -> 무한스크롤, view:'community' -> 페이지네이션
  // const { view = "main", after, limit } = params;
  // const data = await get<GetPostsResponse>("/posts", {
  //   query: {
  //     view,
  //     after,
  //     limit,
  //   },
  // });
  // return data;
}
