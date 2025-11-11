import type { District, FilterCategory, Neighborhood, Province, Store } from "@/types/mapTypes";

export type PostMock = {
  id: number;
  thumbnail: string; // Next/Image 쓰면 domains 허용 필요
  writer: string;
  comment: string;
};

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
