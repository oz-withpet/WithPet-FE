import { clientFetcher, ClientFetcherOptions } from "@/shared/api/clientFetcher";
import { serverFetcher, ServerFetcherOptions } from "@/shared/api/serverFetcher";

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

export async function getPostsClient(params: GetPostsParams): Promise<GetPostsResponse> {
  const options = buildClientPostsRequestOptions(params);

  return clientFetcher<GetPostsResponse>("/community/posts", options);
}

export async function getPostsServer(params: GetPostsParams): Promise<GetPostsResponse> {
  const options = buildServerPostsRequestOptions(params);

  return serverFetcher<GetPostsResponse>("/community/posts", options);
}
