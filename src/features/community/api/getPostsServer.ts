import { serverFetcher, ServerFetcherOptions } from "@/shared/api/serverFetcher";

import { GetPostsParams, GetPostsResponse } from "./type";

function buildServerPostsRequestOptions(params: GetPostsParams): ServerFetcherOptions {
  const { view = "main", after, limit, category } = params;

  return {
    method: "GET",
    auth: "public",
    query: {
      view,
      after,
      limit,
      category,
    },
  };
}

export async function getPostsServer(params: GetPostsParams): Promise<GetPostsResponse> {
  const options = buildServerPostsRequestOptions(params);

  return serverFetcher<GetPostsResponse>("/posts", options);
}
