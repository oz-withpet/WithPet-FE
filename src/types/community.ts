export type PostFormValues = {
  title: string;
  comment: string;
  category: "free" | "qna" | "info";
  images?: string[]; // 기존 이미지 URL들(수정 시)
};

// Discriminated Union으로 edit일 땐 id가 필수
type BaseProps = {
  initialValues?: Partial<PostFormValues>;
  submitLabel?: string;
  onSubmit: (v: PostFormValues) => Promise<void> | void;
  onCancel?: () => void;
};

export type PostFormProps =
  | (BaseProps & { mode: "create" })
  | (BaseProps & { mode: "edit"; postId: string; onDelete?: () => void });
