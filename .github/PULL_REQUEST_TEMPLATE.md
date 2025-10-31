# PR 제목
[Type] {한 줄 요약}
> Type: Chore | Feat | Fix | Style | Docs | Refactor

## 개요
- 무엇을 왜 변경했는지 요약

## 관련 이슈
- Close #{이슈번호}

## 브랜치 정보 (규칙 확인)
- 현재 브랜치: `{여기에 브랜치명}`  
- 규칙: `type/{이슈번호-요약}` (예: `feat/3-common-modal`)  
- PR 대상 브랜치: `dev`

## 변경 사항
- 주요 변경점(화면/로직/폴더 구조)
- 의존성 추가/삭제(있다면)
- 환경 설정 변경 내용(있다면)

## 스크린샷/동영상(선택)
- 전/후 비교, 로딩/에러 화면 등 시각 자료가 있다면 첨부

## 테스트 노트 (※ 테스트 코드 미작성 프로젝트)
- 수동 테스트 시나리오 및 확인 포인트를 기록해주세요.
- 예: npm run dev 실행 시 정상 빌드 및 동작 여부 확인

## 체크리스트
- [ ] 브랜치 네이밍: `type/{이슈번호-요약}` (예: `feat/5-cart-modal`)
- [ ] 커밋 타입: Chore/Feat/Fix/Style/Docs/Refactor 중 사용
- [ ] PR 대상: `dev`
- [ ] ESLint / 타입 체크 통과 (`npm run lint`, `tsc --noEmit`)
- [ ] 관련 이슈 링크 (예: `Close #5`)