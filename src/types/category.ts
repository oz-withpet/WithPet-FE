// src/types/community.ts
export type CommunityCategory = "free" | "qna" | "info";

// URL, 필터로 사용하는 슬러그
export type CategorySlug = "all" | "free" | "qna" | "info";

// 백엔드가 내려주는 한글 라벨
export type Categories = "자유게시판" | "질문게시판" | "정보공유";

// 백엔드가 내려주는 한글 라벨
export type CategoryLabel = "전체" | "자유게시판" | "질문게시판" | "정보공유";

// 우리 앱에서 계속 쓰는 Category는 슬러그 기준으로 유지
export type Category = CategorySlug;

export const CATEGORY_LABEL_BY_SLUG: Record<CategorySlug, CategoryLabel> = {
  all: "전체",
  free: "자유게시판",
  qna: "질문게시판",
  info: "정보공유",
};

export const CATEGORY_SLUG_BY_LABEL: Record<CategoryLabel, CategorySlug> = {
  전체: "all",
  자유게시판: "free",
  질문게시판: "qna",
  정보공유: "info",
};

// 서버에서 받아 폼에 채우는 "초기값"
export type PostInitialValues = {
  title?: string;
  content?: string;
  category?: CommunityCategory;
  images?: string[]; // 기존 이미지: URL/ID 배열
};

// 폼이 제출하는 최종 값
export type PostFormValues = {
  title: string;
  content: string;
  category: CommunityCategory;
  keepImages: string[]; // 유지할 기존 이미지(URL/ID)
  images: File[]; // 새로 업로드할 파일들
};

export type PostFormProps = {
  mode: "create" | "edit";
  initialValues?: PostInitialValues;
  submitLabel?: string;
  onSubmit: (values: PostFormValues) => Promise<void> | void;
  onCancel?: () => void;
  onDelete?: () => void;
};
