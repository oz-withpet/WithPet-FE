export type Category = "all" | "free" | "qna" | "info";

// src/types/community.ts
export type CommunityCategory = "free" | "qna" | "info";

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
