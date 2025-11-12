import type { District, FilterCategory, Neighborhood, Province, Store } from "@/types/mapTypes";

export type PostMock = {
  id: number;
  thumbnail: string; // Next/Image 쓰면 domains 허용 필요
  writer: string;
  comment: string;
};

// 메인페이지 더미데이터
export const DUMMY_MAIN_POSTS: PostMock[] = [
  {
    id: 1,
    thumbnail: "https://placedog.net/200/200?id=1",
    writer: "퍼피러버",
    comment: "첫 산책 준비물 뭐가 좋나요? 🐶",
  },
  {
    id: 2,
    thumbnail: "https://cataas.com/cat?width=200&height=200&ts=1",
    writer: "캣맘",
    comment: "스크래처 추천 부탁해요 🐱",
  },
  {
    id: 3,
    thumbnail: "https://placedog.net/200/200?id=2",
    writer: "walkies",
    comment: "리드줄 길이 어느 정도가 적당할까요?",
  },
  {
    id: 4,
    thumbnail: "https://cataas.com/cat?width=200&height=200&ts=2",
    writer: "냥이연구소",
    comment: "츄르는 하루에 몇 번이 적당할까요?",
  },
  {
    id: 5,
    thumbnail: "https://placedog.net/200/200?id=3",
    writer: "멍스타그램",
    comment: "목욕 후 드라이 꿀팁 공유!",
  },
  {
    id: 6,
    thumbnail: "https://cataas.com/cat?width=200&height=200&ts=3",
    writer: "캣타워장인",
    comment: "캣타워 DIY 후기 남깁니다.",
  },
  {
    id: 7,
    thumbnail: "https://placedog.net/200/200?id=4",
    writer: "도그런홀릭",
    comment: "서울 도그런 지도 업데이트했어요!",
  },
  {
    id: 8,
    thumbnail: "https://cataas.com/cat?width=200&height=200&ts=4",
    writer: "냥냥펀치",
    comment: "중성화 후 관리 팁 알려주세요.",
  },
  {
    id: 9,
    thumbnail: "https://placedog.net/200/200?id=5",
    writer: "치킨둘기",
    comment: "초보 집사 사료 추천 좀!",
  },
  {
    id: 10,
    thumbnail: "https://cataas.com/cat?width=200&height=200&ts=5",
    writer: "고양이별",
    comment: "모래 갈아도 냄새… 해결법?",
  },
];

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

export const provinces: Province[] = [
  { id: "11", name: "서울특별시", code: "SEOUL" },
  { id: "41", name: "경기도", code: "GYEONGGI" },
  { id: "26", name: "부산광역시", code: "BUSAN" },
];

export const districts: District[] = [
  { id: "11680", name: "강남구", province_id: "11", code: "GANGNAM" },
  { id: "11650", name: "서초구", province_id: "11", code: "SEOCHO" },
  { id: "11110", name: "종로구", province_id: "11", code: "JONGNO" },
  { id: "41310", name: "성남시", province_id: "41", code: "SEONGNAM" },
];

export const neighborhoods: Neighborhood[] = [
  { id: "1168010100", name: "역삼동", district_id: "11680", code: "YEOKSAM" },
  { id: "1168010200", name: "논현동", district_id: "11680", code: "NONHYEON" },
  { id: "1168010300", name: "삼성동", district_id: "11680", code: "SAMSUNG" },
  { id: "1165010100", name: "서초동", district_id: "11650", code: "SEOCHO-DONG" },
  { id: "1111010100", name: "청운효자동", district_id: "11110", code: "CHEONGUN" },
];

export const mapCategories: FilterCategory[] = [
  { id: "1", name: "동물병원", code: "hospital", icon: "🏥" },
  { id: "2", name: "애견카페", code: "cafe", icon: "☕" },
  { id: "3", name: "애견미용", code: "grooming", icon: "✂️" },
  { id: "4", name: "애견호텔", code: "hotel", icon: "🏨" },
];

export const storeFixtures: Store[] = [
  {
    id: 1001,
    name: "행복동물병원",
    category: { id: "1", name: "동물병원", code: "hospital" },
    address: {
      province: "서울특별시",
      district: "강남구",
      neighborhood: "역삼동",
      detail: "123-45",
      full_address: "서울특별시 강남구 역삼동 123-45",
      postal_code: "06234",
    },
    phone: "02-1234-5678",
    rating: 4.5,
    review_count: 128,
    tags: ["24시간", "주차가능", "예약필수"],
    distance: 0.8,
    thumbnail_url: "https://cdn.withpet.com/stores/1001/thumb.jpg",
    latitude: 37.5532,
    longitude: 126.9727,
  },
  {
    id: 2001,
    name: "멍멍카페 강남점",
    category: { id: "2", name: "애견카페", code: "cafe" },
    address: {
      province: "서울특별시",
      district: "마포구",
      neighborhood: "합정동",
      detail: "11-2",
      full_address: "서울특별시 마포구 합정동 11-2",
      postal_code: "04068",
    },
    phone: "02-4321-8765",
    rating: 4.2,
    review_count: 89,
    tags: ["포토존", "예약가능"],
    distance: 2.4,
    thumbnail_url: "https://cdn.withpet.com/stores/2001/thumb.jpg",
    latitude: 37.5532,
    longitude: 126.9724,
  },
  {
    id: 3001,
    name: "펫살롱 논현",
    category: { id: "3", name: "애견미용", code: "grooming" },
    address: {
      province: "서울특별시",
      district: "강남구",
      neighborhood: "논현동",
      detail: "45-1",
      full_address: "서울특별시 강남구 논현동 45-1",
      postal_code: "06128",
    },
    phone: "02-2468-1357",
    rating: 4.6,
    review_count: 64,
    tags: ["스파", "프리미엄"],
    distance: 1.1,
    thumbnail_url: "https://cdn.withpet.com/stores/3001/thumb.jpg",
    latitude: 37.5532,
    longitude: 126.9722,
  },
];
