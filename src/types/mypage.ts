// src/types/mypage.ts

// ----------------------
// 공통 타입
// ----------------------
export type Gender = "male" | "female" | "other" | null;

// 프로필 ----------------
export interface MyProfileData {
  email: string;
  nickname: string;
  username: string;
  gender: Gender;
  has_pet: boolean;
  created_at: string;
}

export interface MyProfileResponse {
  success: boolean;
  data: MyProfileData;
}

// PATCH /mypage/profile 바디
export interface MyProfileUpdateRequest {
  nickname?: string;
  gender?: Gender;
  has_pet?: boolean;
}

// 비밀번호 변경 -------------
export interface PasswordChangeRequest {
  new_password: string;
  new_password_confirm: string;
}

// 공통 성공 응답 래퍼 ------
export interface ApiSuccessWrapper {
  success: boolean;
  message?: string;
}

// ----------------------
// 내가 쓴 글 / 좋아요한 글
// ----------------------

// 스펙에 나온 PostListItemCommunity 구조 기준
export interface PostAuthor {
  user_id: string; // 예: "MTE="
  nickname: string;
}

export interface PostListItemCommunity {
  id: string; // 예: "MTAx"
  title: string;
  content_snippet: string;
  category: string;
  image_url: string | null;
  author: PostAuthor;
  created_at: string;
  updated_at: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  is_liked_by_me: boolean;
}

// GET /mypage/posts
export interface MyPostsListResponse {
  posts: PostListItemCommunity[];
  page: number;
  page_size: number;
  total: number;
}

// GET /mypage/likes/posts
export interface MyLikedPostsListResponse {
  posts: PostListItemCommunity[];
  page: number;
  page_size: number;
  total: number;
}

// ----------------------
// 내가 신고한 글
// ----------------------

export type ReportStatus = "processing" | "completed" | string;

export interface MyReportPostItem {
  report_id: string;
  post: {
    id: string;
    title: string;
    author: PostAuthor;
  };
  reason: string;
  detail: string;
  status: ReportStatus;
  created_at: string;
}

export interface MyReportsListResponse {
  reports: MyReportPostItem[];
  page: number;
  page_size: number;
  total: number;
}

// ----------------------
// 관심 장소(매장) 목록
// ----------------------

export interface StoreCategory {
  id: string;
  name: string; // 예: "동물병원"
}

export interface StoreAddress {
  full_address: string;
  latitude: number;
  longtitude: number;
}

export interface StoreSummary {
  id: number;
  name: string;
  category: StoreCategory;
  address: StoreAddress;
  like_count: number;
}

export interface LikedStoreItem {
  like_place_id: string;
  store: StoreSummary;
  created_at: string;
}

export interface MyLikedStoreListResponse {
  liked_stores: LikedStoreItem[];
  page: number;
  page_size: number;
  total: number;
}
