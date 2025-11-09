/**
 * UI 공통 타입 정의
 *
 * - Select / Button 등 공통 컴포넌트가 공유하는 타입을 중앙에서 관리.
 * - 각 컴포넌트를 사용하는 상위 레이어에서도 동일한 타입을 import 하여 일관성을 유지.
 */

export interface SelectOption {
  label: string;
  value: string;
}

export type SelectStatus = "default" | "primary" | "secondary";

export type ButtonStatus = "default" | "primary" | "danger" | "report" | "disable";
