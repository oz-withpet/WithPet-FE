"use client";

import { useState } from "react";

import ImagePicker from "@/components/common/forms/ImagePicker";
import CategoryRadioGroup from "@/components/common/radio/CategoryRadioGroup";
import { PostFormProps, PostFormValues } from "@/types/community";

export default function PostForm(props: PostFormProps) {
  const isEdit = props.mode === "edit";

  // 텍스트/카테고리
  const [values, setValues] = useState<Omit<PostFormValues, "keepImages" | "images">>({
    title: props.initialValues?.title ?? "",
    content: props.initialValues?.content ?? "",
    category: props.initialValues?.category ?? "free",
  });

  // 이미지: 기존(URL/ID) + 신규(File[])
  const [keepImages, setKeepImages] = useState<string[]>(props.initialValues?.images ?? []);
  const [newImages, setNewImages] = useState<File[]>([]);

  const submitText = props.submitLabel ?? (isEdit ? "수정하기" : "작성하기");

  const onChange = (patch: Partial<typeof values>) => setValues((prev) => ({ ...prev, ...patch }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitValues: PostFormValues = {
      ...values,
      keepImages,
      images: newImages,
    };
    await props.onSubmit(submitValues);
  };

  return (
    <form onSubmit={handleSubmit} className="m-auto w-main py-8 text-gray-900">
      {/* category */}
      <CategoryRadioGroup value={values.category} onChange={(v) => onChange({ category: v })} />
      {/* title */}
      <div className="my-4">
        <label htmlFor="title" className="flex items-center text-lg">
          제목
          <span className="ml-1 text-red-500">*</span>
        </label>
        <div className="">
          <input
            name="title"
            value={values.title}
            required
            onChange={(e) => onChange({ title: e.target.value })}
            className="w-main rounded-lg border p-2"
            placeholder="제목을 입력해주세요."
          />
        </div>
      </div>
      {/* content */}
      <div className="my-4">
        <label htmlFor="content" className="flex items-center text-lg">
          내용
          <span className="ml-1 text-red-500">*</span>
        </label>
        <textarea
          name="comment"
          required
          value={values.content}
          onChange={(e) => onChange({ content: e.target.value })}
          className="h-[300px] w-main rounded-lg border p-2"
          placeholder="5자 이상 내용을 입력해주세요."
        />
      </div>
      {/* file */}
      <div className="my-4">
        <label htmlFor="file" className="flex items-center text-lg">
          <div className="">첨부파일</div>
          <div className="ml-2 text-xs text-gray-300">* 첫 이미지가 썸네일으로 들어갑니다.</div>
        </label>
        <ImagePicker
          initialUrls={keepImages} // 기존 이미지 보여주기
          onInitialRemove={(url) => setKeepImages((arr) => arr.filter((u) => u !== url))}
          onChange={(files) => setNewImages(files)} // 새 파일(File[]) 받기
          maxFiles={Math.max(0, 5 - keepImages.length)} // 총 5장 제한 유지
          accept="image/*"
        />
      </div>
      <div className="flex w-main justify-center">
        <div>
          <button className="rounded-3xl border-2 border-orange-300 bg-white px-16 py-2 hover:cursor-pointer hover:bg-orange-300 hover:font-semibold hover:text-white">
            {submitText}
          </button>
          {props.onCancel && (
            <button type="button" onClick={props.onCancel} className="rounded border px-4 py-2">
              취소
            </button>
          )}
          {isEdit && props.onDelete && (
            <button
              type="button"
              onClick={props.onDelete}
              className="ml-3 cursor-pointer rounded-3xl border-2 border-orange-300 bg-white px-16 py-2 text-red-600 hover:border-red-600 hover:bg-red-600 hover:font-semibold hover:text-white"
            >
              삭제
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
