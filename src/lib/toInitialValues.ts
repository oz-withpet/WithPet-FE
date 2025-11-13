import { CommunityCategory, PostInitialValues } from "@/types/category";

const CATEGORIES = ["free", "qna", "info"] as const;
function isCategory(v: unknown): v is CommunityCategory {
  return typeof v === "string" && (CATEGORIES as readonly string[]).includes(v);
}

function normalizeImageUrls(src: unknown): string[] {
  if (!src) return [];
  if (typeof src === "string") return src.trim() ? [src] : [];
  if (Array.isArray(src))
    return src.filter((s): s is string => typeof s === "string" && !!s.trim());
  return [];
}

/** 백엔드 상세 응답(더미 포함) -> PostInitialValues */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toInitialValues(detail: any): PostInitialValues {
  return {
    title: detail?.title ?? "",
    content: detail?.content ?? detail?.comment ?? "",
    category: isCategory(detail?.category) ? detail.category : "free",
    images: normalizeImageUrls(detail?.image ?? detail?.images),
  };
}
