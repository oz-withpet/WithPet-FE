export const postKeys = {
  all: ["posts"] as const,
  detail: (id: string | number) => [...postKeys.all, "detail", id] as const,
};
