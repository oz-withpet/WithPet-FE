export const postKeys = {
  all: ["posts"] as const,
  list: (params: unknown) => [...postKeys.all, "list", params] as const,
  detail: (id: string | number) => [...postKeys.all, "detail", id] as const,
};
