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
