import type { HttpHandler } from "msw";

// 실제 backend API를 직접 호출하므로 현재는 map 관련 mock이 필요하지 않습니다.
export const mapHandlers: HttpHandler[] = [];
