export type PostFormValues = {
  title: string;
  content: string;
  category: "free" | "qna" | "info";
  images?: File[]; // 기존 이미지 URL들(수정 시)
  keepImages?: string[]; // 기존 이미지 중 유지할 것들(수정 시)
};

export type CommunityCategory = "free" | "qna" | "info";

export type PostFormProps = {
  mode: "create" | "edit";
  initialValues?: {
    title?: string;
    content?: string;
    category?: CommunityCategory;
    /** 수정 페이지 진입 시 서버에 이미 있는 이미지(URL/ID) */
    images?: string[];
  };
  submitLabel?: string;
  onSubmit: (values: PostFormValues) => Promise<void> | void;
  onCancel?: () => void;
  onDelete?: () => void;
};
