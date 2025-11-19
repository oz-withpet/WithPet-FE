import { clientFetcher } from "@/shared/api/clientFetcher";
import { MyPostsListResponse } from "@/types/mypage";

export type MyPageListParams = {
  page?: number;
  page_size?: number;
  after?: string;
  limit?: number;
};

export async function getMyPosts(params: MyPageListParams = {}) {
  const search = new URLSearchParams();

  if (params.page != null) search.set("page", String(params.page));
  if (params.page_size != null) search.set("page_size", String(params.page_size));

  const qs = search.toString();
  const path = `/mypage/posts${qs ? `${qs}` : ""}`;

  const res = await clientFetcher<MyPostsListResponse>(path, {
    method: "GET",
    auth: "private",
  });

  return res;
}
