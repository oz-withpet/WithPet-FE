import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { type SelectOption, type SelectStatus } from "@/types/ui";

const STATUS_CLASS_MAP: Record<SelectStatus, string> = {
  default: "border-gray-900 hover:bg-gray-900",
  primary: "border-orange-300 hover:bg-orange-300",
  secondary: "border-gray-300 hover:bg-gray-50",
};

/**
 * 공통 Select 컴포넌트
 *
 * @description
 * - shadcn/ui의 Select를 기반으로 제작된 공통 셀렉트 컴포넌트입니다.
 * - `status` 값을 전달하면 컴포넌트 내부에서 상태별 Tailwind 클래스를 자동으로 지정.
 * - 상태(`disabled`)에 따른 기본 스타일은 유지되며,
 *   `className` 으로 추가 커스터마이징이 가능합니다.
 *
 * @example
 * ```tsx
 * <Select
 *   value={animal}
 *   onChange={setAnimal}
 *   options={[
 *     { label: "강아지", value: "dog" },
 *     { label: "고양이", value: "cat" },
 *   ]}
 *   placeholder="선택하세요"
 *   status="primary"
 * />
 * ```
 */
export interface SelectProps {
  /** 현재 선택된 값 */
  value: string;
  /** 셀렉트 옵션 목록 */
  options: SelectOption[];
  /** 값 변경 핸들러 */
  onChange: (value: string) => void;
  /** 비활성화 여부 (기본값: false) */
  disabled?: boolean;
  /** placeholder 텍스트 (기본값: '선택하세요') */
  placeholder?: string;
  /** 상태에 따라 자동으로 적용되는 스타일 */
  status?: SelectStatus;
  /** 추가 커스터마이징을 위한 className */
  className?: string;
}

/**
 * @component
 * @returns {JSX.Element} 셀렉트 UI 컴포넌트
 */
export default function Select({
  value,
  options,
  onChange,
  disabled = false,
  placeholder = "선택하세요",
  status = "default",
  className = "",
}: SelectProps) {
  return (
    <ShadcnSelect value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger
        className={cn(
          // 기본 스타일
          "w-full flex-1 rounded-md border-2 bg-white text-sm text-gray-900 transition-colors",
          "disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:placeholder:text-gray-900",
          "hover:text-white hover:shadow-none hover:placeholder:text-white focus:ring-0",
          STATUS_CLASS_MAP[status],
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={cn("z-[10000] rounded-md bg-white shadow-md")}>
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className="cursor-pointer text-sm hover:bg-orange-200 focus:bg-orange-300"
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </ShadcnSelect>
  );
}
