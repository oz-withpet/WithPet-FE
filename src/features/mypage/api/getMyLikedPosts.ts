import { clientFetcher } from "@/shared/api/clientFetcher";
import { MyLikedPostsListResponse } from "@/types/mypage";

export type GetMyLikedPostsParams = {
  page?: number;
  page_size?: number;
  after?: string;
  limit?: number;
};

export async function getMyLikedPosts(
  params: GetMyLikedPostsParams,
): Promise<MyLikedPostsListResponse> {
  return clientFetcher<MyLikedPostsListResponse>("/mypage/likes/posts", {
    method: "GET",
    auth: "private",
    query: {},
  });
}
