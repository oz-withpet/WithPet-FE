// src/entities/community/ui/CategoryRadioGroup.tsx
"use client";

import type { ChangeEvent } from "react";

type CommunityCategory = "free" | "qna" | "info";

const CATEGORY_LABELS: Record<CommunityCategory, string> = {
  free: "자유게시판",
  qna: "질문게시판",
  info: "정보공유",
};

type Props = {
  value: CommunityCategory; // 현재 선택값(컨트롤드)
  onChange: (v: CommunityCategory) => void; // 변경 콜백
  name?: string; // 폼 전송용 name (기본: "category")
  disabled?: boolean;
  className?: string;
};

export default function CategoryRadioGroup({
  value,
  onChange,
  name = "category",
  disabled,
  className,
}: Props) {
  const entries = Object.entries(CATEGORY_LABELS) as [CommunityCategory, string][];

  const base =
    "inline-flex  items-center gap-2 rounded-3xl border-2 px-3 py-2 cursor-pointer select-none";
  const active = "border-orange-300 bg-orange-300 text-white font-semibold";
  const inactive =
    "border-gray-300 hover:border-orange-300 text-gray-900 hover:bg-white hover:font-semibold";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value as CommunityCategory);

  return (
    <fieldset className={className} disabled={disabled}>
      <legend className="flex items-center text-lg">
        <div className="">카테고리</div>
        <div className="ml-3 text-xs text-red-500">* 기본값은 &#39;자유게시판&#39; 입니다.</div>
      </legend>
      <div className="flex gap-2 py-3">
        {entries.map(([key, label]) => {
          const isActive = value === key;
          return (
            <label key={key} className={`${base} ${isActive ? active : inactive}`}>
              <input
                type="radio"
                className="sr-only"
                name={name}
                value={key}
                checked={isActive}
                onChange={handleChange}
              />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
