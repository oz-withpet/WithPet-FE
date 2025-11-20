# WithPet FE

반려동물 동반 지도와 커뮤니티를 제공하는 WithPet 프런트엔드입니다. Next.js(App Router) 기반으로 인증, 지도, 커뮤니티, 마이페이지 기능을 구현했으며, TanStack Query와 Redux로 상태를 관리합니다. CI/CD는 GitHub Actions로 자동화되어 있습니다.

---

## 주요 기능

- **인증/회원가입**: 로그인/회원가입, 토큰(httpOnly 쿠키+Redux) 저장, 보호 경로 미들웨어 검사·갱신.
- **지도**: 시·군·구/읍·면·동/카테고리 필터 GET, 중심 좌표 기반 POST 조회, 지도 이동/현 위치/줌 연동, 마커–리스트 동기화.
- **커뮤니티**: 게시글 목록/카테고리/상세/작성·수정, SSR + 클라이언트 패처 조합, 작성/수정은 인증 필수.
- **마이페이지**: 프로필/비밀번호/게시글·좋아요·저장/신고 게시물 등 계정 관리 전반.
- **공통/인프라**: 버튼·Select 등 UI, 인증/지도/커뮤니티용 fetcher와 타입/매퍼, Pretendard 전역 폰트(CDN).

---

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript, React 18
- **State**: Redux Toolkit, TanStack Query
- **Styling**: Tailwind CSS, Radix UI 일부 컴포넌트, Pretendard(CDN)
- **API**: 커스텀 clientFetcher/serverFetcher, MSW(초기 mock 정리)
- **품질/도구**: ESLint, Prettier, Husky + lint-staged, CI/CD(GitHub Actions)

---

## 프로젝트 구조 (주요)

```
src/
  app/                 # App Router 엔트리
  features/
    login/             # 로그인 API/훅/폼
    signup/            # 회원가입 UI/검증/핸들러
    map/               # 지도 검색/스토어/상태/컴포넌트
    community/         # 커뮤니티 API 및 페이지(목록/카테고리/상세/작성)
    mypage/            # 프로필/비밀번호/게시글/좋아요/저장 등 계정 관리
  shared/
    api/               # clientFetcher, serverFetcher
    store/             # Redux slice(index, mapSlice, authSlice 등)
  components/          # 공통 UI/레이아웃
  providers/           # 공용 Provider
.github/workflows/     # CI/CD (depoly.yaml)
.github/workflows/     # CI/CD (depoly.yaml)
```

---

## 환경 변수

`.env.local` 예시:

```
NEXT_PUBLIC_BACKEND_API_URL=https://api.withpet.space
NEXT_PUBLIC_KAKAO_MAP_API_KEY=<카카오맵_JAVASCRIPT_KEY>
```

필요 시 로컬에 맞게 조정합니다.

---

## 스크립트

```
npm run dev     # 개발 서버 (http://localhost:3000)
npm run lint    # ESLint 검사
npm run build   # 프로덕션 빌드
npm run start   # 빌드 결과 실행
npm run format  # Prettier 포맷
```

---

## 인증 흐름

- **로그인**: `/auth/login/` POST → body의 `access`를 Redux에 저장, 쿠키(access_token/refresh_token)는 브라우저가 자동 저장.
- **미들웨어**: 보호 경로에서 access 쿠키 검사 → 없으면 refresh로 `/auth/token/refresh` POST → 성공 시 새 access 쿠키 굽고 진행, 실패 시 로그인 리다이렉트.
- **패처**: `clientFetcher`는 private 시 `credentials: "include"` + Redux 토큰으로 Authorization 헤더를 붙여 호출. `serverFetcher`는 서버 사이드에서 쿠키 기반으로 헤더를 구성.

---

## 지도 기능 요약

- GET `/locations` 계열로 시/군/동 데이터, GET `/stores`로 필터 기반 검색.
- POST `/stores/`로 중심 좌표 + 반경 기반 검색(지도 이동/현 위치/줌 이벤트 대응).
- Redux `mapSlice`로 필터, 센터, 줌, 마커, 선택 매장, 상태를 통합 관리.
- 카드–마커 연동: 마커 클릭 시 카드 펼침/스크롤, 카드 클릭 시 지도 중심 이동.

---

## 품질/자동화

- **Husky + lint-staged**: 커밋 전 변경 파일 포맷/린트, 전체 린트 실행.
- **GitHub Actions**: develop push 시
  - Node 20.10.0 세팅 → `npm ci` → `npm run lint` → `npm run build`
  - `build.sh`로 필요 파일만 `output/`에 복사(무한 복사/대용량 방지)
  - `cpina/github-action-push-to-another-repository`로 `output`을 타 저장소 브랜치에 반영

---

## 폰트

- `public/fonts/PretendardVariable.woff2`를 @font-face로 등록해 기본 폰트로 사용합니다.
- `src/app/globals.css`에서 `"Pretendard Variable"`을 기본 폰트로 선언합니다.

---

## 자주 겪는 이슈

- **쿠키 도메인/권한**: httpOnly 쿠키는 도메인 설정에 따라 미들웨어가 읽지 못할 수 있음(백엔드 도메인 설정 필요).
- **워크플로 push 실패**: workflow 파일 수정 시 PAT에 `workflow` 스코프 필요. 토큰 노출 시 즉시 revoke 후 갱신.
- **대용량 파일 push**: `build.sh`는 `.next`, `node_modules`를 제외해 SWC 바이너리 100MB 초과 문제를 방지.

---

## 기타 참고

- 보호 경로: `/login`, `/signup`, `/map` 외에는 미들웨어 토큰 검사 대상(필요 시 패스 리스트에 추가).
- 쿠키 도메인 설정에 따라 미들웨어 토큰 읽기 여부가 달라질 수 있습니다(운영/로컬 도메인 확인).
