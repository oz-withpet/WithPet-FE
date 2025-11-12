// src/entities/community/model/category.ts
export const CATEGORY_LABELS = {
  free: "자유게시판",
  qna: "질문게시판",
  info: "정보공유",
} as const;

export type CommunityCategory = keyof typeof CATEGORY_LABELS;

/** 유효한 카테고리 문자열인지 체크 */
export function isCommunityCategory(v: string): v is CommunityCategory {
  return (["free", "qna", "info"] as const).includes(v as CommunityCategory);
}

/** API 값(unknown/undefined 가능)을 정규화: 유효하면 카테고리, 아니면 undefined */
export function normalizeCategory(v: unknown): CommunityCategory | undefined {
  if (typeof v !== "string") return undefined;
  const s = v.trim().toLowerCase();
  return isCommunityCategory(s) ? (s as CommunityCategory) : undefined;
}

/** 라벨을 안전하게 얻기 (fallback 제공) */
export function getCategoryLabelSafe(v: unknown, fallback = "분류 없음"): string {
  const cat = normalizeCategory(v);
  return cat ? CATEGORY_LABELS[cat] : fallback;
}
