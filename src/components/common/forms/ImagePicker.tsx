"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type ImagePickerProps = {
  name?: string; // form 전송용 name (기본: images)
  multiple?: boolean;
  maxFiles?: number;
  maxSizeMB?: number;
  accept?: string; // "image/*"
  onChange?: (files: File[]) => void;
  className?: string;
};

export default function ImagePicker({
  name = "images",
  multiple = true,
  maxFiles = 5,
  maxSizeMB = 5,
  accept = "image/*",
  onChange,
  className,
}: ImagePickerProps) {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);

  useEffect(() => {
    return () => previews.forEach((u) => URL.revokeObjectURL(u));
  }, [previews]);

  const pick = () => inputRef.current?.click();

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const next = [...files];
    const limit = maxFiles - next.length;
    for (const f of Array.from(incoming).slice(0, limit)) {
      if (!f.type.startsWith("image/")) continue;
      if (f.size > maxSizeMB * 1024 * 1024) continue;
      next.push(f);
    }
    setFiles(next);
    onChange?.(next);
  };

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeAt = (idx: number) => {
    const next = files.filter((_, i) => i !== idx);
    setFiles(next);
    onChange?.(next);
  };

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        hidden
        onChange={(e) => handleFiles(e.currentTarget.files)}
      />
      {/* 드롭존 */}
      <div
        onClick={pick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-sm text-gray-500 hover:bg-gray-50"
      >
        <span>이미지를 드래그하거나 클릭해서 선택</span>
        <span className="mt-1 text-xs text-gray-400">
          최대 {maxFiles}개, {maxSizeMB}MB 이하
        </span>
      </div>

      {/* 미리보기 */}
      {files.length > 0 && (
        <ul className="mt-3 grid grid-cols-3 gap-2">
          {previews.map((src, i) => (
            <li key={src} className="relative">
              {/* 미리보기는 <img>로, 업로드는 FormData로 file 자체가 전송됨 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-24 w-full rounded object-cover" />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute right-1 top-1 rounded bg-black/60 px-2 py-0.5 text-xs text-white"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
