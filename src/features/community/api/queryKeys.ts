import { GetPostsParams } from "./type";

export const postKeys = {
  all: ["posts", "detail"] as const,
  list: (params: GetPostsParams) => [...postKeys.all, "list", params],
  detail: (id: string | number) => [...postKeys.all, "detail", id],
};
