// src/mocks/postDetails.ts
export type PostDetailMock = {
  id: number;
  category: "free" | "qna" | "info";
  title: string;
  comment: string;
  user: { name: string; thumbnail: string };
  createdAt: string; // ISO(YYYY-MM-DD) 등 문자열
  likeCount: number;
  image: string; // NOTE: 'image' 오타를 의도적으로 유지 (스키마 맞춤)
};

// 상세페이지 더미데이터
export const DUMMY_POST_DETAILS: PostDetailMock[] = [
  {
    id: 1,
    category: "free",
    title: "첫 산책 준비 체크리스트",
    comment: "첫 산책 준비물 뭐가 좋나요? 🐶",
    user: { name: "퍼피러버", thumbnail: "https://placedog.net/100/100?id=101" },
    createdAt: "2025-11-01",
    likeCount: 12,
    image: "https://placedog.net/800/600?id=1",
  },
  {
    id: 2,
    category: "qna",
    title: "스크래처 추천 부탁드려요",
    comment: "스크래처 추천 부탁해요 🐱",
    user: { name: "캣맘", thumbnail: "https://cataas.com/cat?width=100&height=100&ts=101" },
    createdAt: "2025-11-01",
    likeCount: 8,
    image: "https://cataas.com/cat?width=800&height=600&ts=1",
  },
  {
    id: 3,
    category: "qna",
    title: "리드줄 길이, 얼마가 적당할까요?",
    comment: "리드줄 길이 어느 정도가 적당할까요?",
    user: { name: "walkies", thumbnail: "https://placedog.net/100/100?id=102" },
    createdAt: "2025-11-02",
    likeCount: 5,
    image: "https://placedog.net/800/600?id=2",
  },
  {
    id: 4,
    category: "qna",
    title: "츄르 급여 빈도 고민",
    comment: "츄르는 하루에 몇 번이 적당할까요?",
    user: { name: "냥이연구소", thumbnail: "https://cataas.com/cat?width=100&height=100&ts=102" },
    createdAt: "2025-11-02",
    likeCount: 17,
    image: "https://cataas.com/cat?width=800&height=600&ts=2",
  },
  {
    id: 5,
    category: "info",
    title: "목욕 후 드라이 꿀팁 공유",
    comment: "목욕 후 드라이 꿀팁 공유!",
    user: { name: "멍스타그램", thumbnail: "https://placedog.net/100/100?id=103" },
    createdAt: "2025-11-03",
    likeCount: 22,
    image: "https://placedog.net/800/600?id=3",
  },
  {
    id: 6,
    category: "free",
    title: "캣타워 DIY 후기",
    comment: "캣타워 DIY 후기 남깁니다.",
    user: { name: "캣타워장인", thumbnail: "https://cataas.com/cat?width=100&height=100&ts=103" },
    createdAt: "2025-11-03",
    likeCount: 14,
    image: "https://cataas.com/cat?width=800&height=600&ts=3",
  },
  {
    id: 7,
    category: "info",
    title: "서울 도그런 지도 업데이트",
    comment: "서울 도그런 지도 업데이트했어요!",
    user: { name: "도그런홀릭", thumbnail: "https://placedog.net/100/100?id=104" },
    createdAt: "2025-11-04",
    likeCount: 31,
    image: "https://placedog.net/800/600?id=4",
  },
  {
    id: 8,
    category: "qna",
    title: "중성화 후 관리 팁",
    comment: "중성화 후 관리 팁 알려주세요.",
    user: { name: "냥냥펀치", thumbnail: "https://cataas.com/cat?width=100&height=100&ts=104" },
    createdAt: "2025-11-05",
    likeCount: 19,
    image: "https://cataas.com/cat?width=800&height=600&ts=4",
  },
  {
    id: 9,
    category: "qna",
    title: "초보 집사 사료 추천",
    comment: "초보 집사 사료 추천 좀!",
    user: { name: "치킨둘기", thumbnail: "https://placedog.net/100/100?id=105" },
    createdAt: "2025-11-06",
    likeCount: 9,
    image: "https://placedog.net/800/600?id=5",
  },
  {
    id: 10,
    category: "qna",
    title: "모래 냄새 해결법?",
    comment: "모래 갈아도 냄새… 해결법?",
    user: { name: "고양이별", thumbnail: "https://cataas.com/cat?width=100&height=100&ts=105" },
    createdAt: "2025-11-07",
    likeCount: 27,
    image: "https://cataas.com/cat?width=800&height=600&ts=5",
  },
];
