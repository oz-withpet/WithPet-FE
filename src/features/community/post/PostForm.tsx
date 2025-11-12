"use client";

import { useState } from "react";

import ImagePicker from "@/components/common/forms/ImagePicker";
import CategoryRadioGroup from "@/components/common/radio/CategoryRadioGroup";
import { PostFormProps, PostFormValues } from "@/types/community";

export default function PostForm(props: PostFormProps) {
  const isEdit = props.mode === "edit";

  const [values, setValues] = useState<PostFormValues>({
    title: props.initialValues?.title ?? "",
    comment: props.initialValues?.comment ?? "",
    category: props.initialValues?.category ?? "free",
    images: props.initialValues?.images ?? [],
  });

  const submitText = props.submitLabel ?? (isEdit ? "수정하기" : "작성하기");

  const onChange = (patch: Partial<PostFormValues>) => setValues((prev) => ({ ...prev, ...patch }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await props.onSubmit(values);
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
      {/* comment */}
      <div className="my-4">
        <label htmlFor="comment" className="flex items-center text-lg">
          내용
          <span className="ml-1 text-red-500">*</span>
        </label>
        <textarea
          name="comment"
          required
          value={values.comment}
          onChange={(e) => onChange({ comment: e.target.value })}
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
        <ImagePicker />
      </div>
      <div className="flex w-main justify-center">
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
            className="ml-auto rounded border px-4 py-2 text-red-600"
          >
            삭제
          </button>
        )}
      </div>
    </form>
  );
}
