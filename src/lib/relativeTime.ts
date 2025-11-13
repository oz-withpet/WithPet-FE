const rtf = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });

function parseAsKST(input: string | Date): Date {
  if (input instanceof Date) return input;
  // "YYYY-MM-DD" 같은 날짜-only 문자열은 JS가 UTC로 파싱해서 하루 밀릴 수 있음
  // KST 자정으로 강제 파싱
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    return new Date(`${input}T00:00:00+09:00`);
  }
  return new Date(input); // ISO(타임존 포함) 권장: "2025-11-12T10:12:00+09:00"
}

export function toRelativeKorean(input: string | Date, now: Date = new Date()): string {
  const date = parseAsKST(input);
  const diffSec = Math.round((date.getTime() - now.getTime()) / 1000); // 미래는 양수, 과거는 음수
  const abs = Math.abs(diffSec);

  // 너무 세밀할 필요 없으면 이 정도 단계가 실무에 무난
  if (abs < 60) return "방금 전";

  if (abs < 3600) {
    const v = Math.round(diffSec / 60);
    return rtf.format(v, "minute");
  }
  if (abs < 86400) {
    const v = Math.round(diffSec / 3600);
    return rtf.format(v, "hour");
  }
  if (abs < 604800) {
    const v = Math.round(diffSec / 86400);
    return rtf.format(v, "day"); // 예: "3일 전"
  }
  if (abs < 2629800) {
    // ≈ 1달
    const v = Math.round(diffSec / 604800);
    return rtf.format(v, "week");
  }
  if (abs < 31557600) {
    // ≈ 1년
    const v = Math.round(diffSec / 2629800);
    return rtf.format(v, "month");
  }
  const v = Math.round(diffSec / 31557600);
  return rtf.format(v, "year");
}
