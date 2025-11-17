import { serverFetcher, ServerFetcherOptions } from "@/shared/api/serverFetcher";

import { GetPostsParams, GetPostsResponse } from "./type";

function buildServerPostsRequestOptions(params: GetPostsParams): ServerFetcherOptions {
  const { view = "main", after, limit } = params;

  return {
    method: "GET",
    auth: "public",
    query: {
      view,
      after,
      limit,
    },
  };
}

export async function getPostsServer(params: GetPostsParams): Promise<GetPostsResponse> {
  const options = buildServerPostsRequestOptions(params);

  return serverFetcher<GetPostsResponse>("/community/posts", options);
}
