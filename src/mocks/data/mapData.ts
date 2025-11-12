import type { District, FilterCategory, Neighborhood, Province, Store } from "@/types/mapTypes";

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
