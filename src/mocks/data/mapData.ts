export const provinces = [
  { id: "11", name: "서울특별시", code: "SEOUL" },
  { id: "41", name: "경기도", code: "GYEONGGI" },
  { id: "26", name: "부산광역시", code: "BUSAN" },
];

export const districts = [
  { id: "11680", name: "강남구", province_id: "11", code: "GANGNAM" },
  { id: "11650", name: "서초구", province_id: "11", code: "SEOCHO" },
  { id: "11110", name: "종로구", province_id: "11", code: "JONGNO" },
];

export const neighborhoods = [
  { id: "1168010100", name: "역삼동", district_id: "11680", code: "YEOKSAM" },
  { id: "1168010200", name: "논현동", district_id: "11680", code: "NONHYEON" },
  { id: "1168010300", name: "삼성동", district_id: "11680", code: "SAMSUNG" },
];

export const categories = [
  { id: "001", name: "동물병원", code: "HOSPITAL" },
  { id: "002", name: "반려동물미용", code: "BEAUTY" },
  { id: "003", name: "반려동물호텔", code: "HOTEL" },
  { id: "004", name: "반려동물카페", code: "CAFE" },
];

export const stores = [
  {
    id: "001",
    name: "강남 24시 동물병원",
    category: { id: "001", name: "동물병원" },
    address: {
      province: "서울특별시",
      district: "강남구",
      neighborhood: "역삼동",
      detail: "테헤란로 123",
      full_address: "서울특별시 강남구 역삼동 테헤란로 123",
    },
    phone: "02-1234-5678",
    rating: 4.5,
    review_count: 328,
    tags: ["24시간", "주차가능", "야간진료"],
    distance: null,
  },
];
