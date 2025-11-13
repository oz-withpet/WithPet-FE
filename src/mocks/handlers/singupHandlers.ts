import { http, HttpResponse, delay } from "msw";

// requestId → { email, code } 저장
// 임시로 "이미 사용중"이라고 볼 값들
const usedEmails = new Set(["taken@example.com"]);
const usedNicknames = new Set(["꼬미아빠", "냥집사", "puppylover"]);
// requestId -> { email, code }
const codeByRequestId = new Map<string, { email: string; code: string }>();

const RE_EMAIL = /^\S+@\S+\.\S+$/;
const genId = (p: string) => `${p}_${Math.random().toString(36).slice(2, 10)}`;
const genCode = () => String(Math.floor(100000 + Math.random() * 900000)); // 6자리 코드

export const signupHandlers = [
  // 닉네임 중복검사
  // GET /api/users/nickname/availability?nickname=...
  http.get("/api/users/nickname/availability", async ({ request }) => {
    await delay(100);

    const url = new URL(request.url);
    const nickname = (url.searchParams.get("nickname") || "").trim();

    if (!nickname) {
      return HttpResponse.json({ message: "nickname required" }, { status: 400 });
    }
    if (nickname.length < 2 || nickname.length > 20 || /\s/.test(nickname)) {
      return HttpResponse.json({ message: "invalid nickname" }, { status: 422 });
    }

    const taken = usedNicknames.has(nickname.toLowerCase());
    const suggestions = taken
      ? Array.from({ length: 3 }, () => `${nickname}${Math.floor(100 + Math.random() * 900)}`)
      : [];

    return HttpResponse.json({ available: !taken, suggestions });
  }),

  // 이메일 인증코드 전송
  // POST /api/email/send-code  { email }
  http.post("/api/email/send-code", async ({ request }) => {
    await delay(100);

    const { email } = (await request.json()) as { email: string };

    if (!email || !RE_EMAIL.test(email)) {
      return HttpResponse.json({ message: "invalid email" }, { status: 400 });
    }
    if (usedEmails.has(email.toLowerCase())) {
      return HttpResponse.json({ message: "email already registered" }, { status: 409 });
    }

    const requestId = genId("req");
    const code = genCode();
    codeByRequestId.set(requestId, { email, code });

    console.log(`[MSW] email code → ${email}: ${code}`);

    return HttpResponse.json({
      requestId,
      expiresInSeconds: 600, // 그냥 더미
      resendAvailableInSeconds: 0, // 더미
    });
  }),

  // 이메일 인증코드 검증
  // POST /api/email/verify-code  { requestId, code }
  http.post("/api/email/verify-code", async ({ request }) => {
    await delay(100);

    const { requestId, code } = (await request.json()) as { requestId: string; code: string };

    const rec = codeByRequestId.get(requestId);
    if (!rec) {
      return HttpResponse.json({ message: "invalid requestId" }, { status: 400 });
    }
    if (rec.code !== code) {
      return HttpResponse.json({ message: "code mismatch" }, { status: 400 });
    }

    const verificationToken = genId("vtoken");
    codeByRequestId.delete(requestId);

    return HttpResponse.json({
      verificationToken,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    });
  }),
];
