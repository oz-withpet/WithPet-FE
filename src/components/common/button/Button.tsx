import { type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { type ButtonStatus } from "@/types/ui";

export type { ButtonStatus } from "@/types/ui";

const ACTIVE_CLASS_MAP: Record<ButtonStatus, string> = {
  default:
    "border-line-100 bg-white text-gray-900 hover:bg-black hover:text-white hover:border-black",
  primary: "border-orange-300 bg-white text-gray-900 hover:bg-orange-300 hover:text-white",
  danger: "border-warning bg-white text-warning hover:bg-warning hover:text-white",
  report: "border-red-strong bg-white text-red-report hover:bg-red-strong hover:text-white",
  disable: "border-gray-300 text-gray-100 bg-gray-300 pointer-events: none cursor-not-allowed",
};

const ACTIVE_STATE_MAP: Record<ButtonStatus, string> = {
  default: "bg-black text-white border-black",
  primary: "bg-orange-300 text-white border-orange-300",
  danger: "bg-warning text-white border-warning",
  report: "bg-red-strong text-white border-red-strong",
  disable: "",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 상태에 따른 스타일 지정 */
  status?: ButtonStatus;
  /** 버튼 텍스트가 따로 없다면 label 로 간단히 전달 가능 */
  label?: string;
  /** 버튼 활성화 여부 */
  isActive?: boolean;
}

/**
 * 공통 Button 컴포넌트
 *
 * - status 값으로 기본, 주황(primary), 삭제,경고(danger), 신고(report) 테마를 지정.
 * - 필요 시 className 으로 추가 커스터마이징이 가능합니다.
 */
export default function Button({
  status = "default",
  className,
  label,
  isActive = false,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "h-9 rounded-full border-2 px-6 text-sm font-medium transition-colors",
        "focus:outline-none",
        ACTIVE_CLASS_MAP[status],
        isActive && ACTIVE_STATE_MAP[status],
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children ?? label}
    </button>
  );
}
