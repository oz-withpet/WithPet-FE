"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        {...props}
        className={cn(
          "w-full h-auto rounded-[12px] border px-[16px] py-[12px]",
          "border-line-light bg-white",
          "text-[14px] text-gray-900 caret-gray-900",
          // ⬇️ placeholder 가시성 보장
          "placeholder:text-gray-400",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200 focus-visible:border-line-strong",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className
        )}
      />
    );
  }
);
Input.displayName = "Input";
export { Input };

