import { clientFetcher, ClientFetcherOptions } from "@/shared/api/clientFetcher";

import { GetPostsParams, GetPostsResponse } from "./type";

function buildClientPostsRequestOptions(params: GetPostsParams): ClientFetcherOptions {
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

export async function getPostsClient(params: GetPostsParams): Promise<GetPostsResponse> {
  const options = buildClientPostsRequestOptions(params);

  return clientFetcher<GetPostsResponse>("/community/posts", options);
}
