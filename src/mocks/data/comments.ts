// src/mocks/comments.ts
export type CommentMock = {
  id: number;
  comment: string;
  user: {
    name: string;
    image: string; // avatar
  };
  createdAt: string; // ISO 8601
};

export const DUMMY_COMMENTS: CommentMock[] = [
  {
    id: 1,
    comment: "첫 산책이라 긴장되네요 😂 꿀팁 환영합니다!",
    user: { name: "퍼피러버", image: "https://placedog.net/100/100?id=201" },
    createdAt: "2025-11-06T10:12:00Z",
  },
  {
    id: 2,
    comment: "스크래처는 기둥형이 제일 오래 가더라고요.",
    user: { name: "캣맘", image: "https://cataas.com/cat?width=100&height=100&ts=201" },
    createdAt: "2025-11-06T11:05:00Z",
  },
  {
    id: 3,
    comment: "하네스 적응시키는 법 공유드려요 🙌",
    user: { name: "와키", image: "https://placedog.net/100/100?id=202" },
    createdAt: "2025-11-06T12:40:00Z",
  },
  {
    id: 4,
    comment: "츄르는 하루 1~2개면 충분해요!",
    user: { name: "냥이연구소", image: "https://cataas.com/cat?width=100&height=100&ts=202" },
    createdAt: "2025-11-06T13:22:00Z",
  },
  {
    id: 5,
    comment: "목욕 후엔 드라이룸 대신 타월+드라이기 조합 추천🔥",
    user: { name: "멍스타그램", image: "https://placedog.net/100/100?id=203" },
    createdAt: "2025-11-06T14:03:00Z",
  },
  {
    id: 6,
    comment: "캣타워는 천장 고정형이 안정적이었어요.",
    user: { name: "캣타워장인", image: "https://cataas.com/cat?width=100&height=100&ts=203" },
    createdAt: "2025-11-06T15:18:00Z",
  },
  {
    id: 7,
    comment: "여의도 도그런 주말엔 붐벼요. 평일 아침 추천!",
    user: { name: "도그런홀릭", image: "https://placedog.net/100/100?id=204" },
    createdAt: "2025-11-06T16:47:00Z",
  },
  {
    id: 8,
    comment: "중성화 후 보양식 뭐 주시나요?",
    user: { name: "냥냥펀치", image: "https://cataas.com/cat?width=100&height=100&ts=204" },
    createdAt: "2025-11-06T17:33:00Z",
  },
  {
    id: 9,
    comment: "사료는 소포장으로 자주 갈아주는 게 냄새 덜 나요.",
    user: { name: "치킨둘기", image: "https://placedog.net/100/100?id=205" },
    createdAt: "2025-11-06T18:21:00Z",
  },
  {
    id: 10,
    comment: "모래 탈취는 자주 갈아주기 + 베이킹소다 소량!",
    user: { name: "고양이별", image: "https://cataas.com/cat?width=100&height=100&ts=205" },
    createdAt: "2025-11-06T19:00:00Z",
  },
];
