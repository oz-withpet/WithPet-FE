// src/features/mypage/api/mypageApi.ts
import { clientFetcher } from "@/shared/api/clientFetcher";
import type {
  MyProfileResponse,
  MyProfileUpdateRequest,
  PasswordChangeRequest,
  ApiSuccessWrapper,
  NicknameCheckResponse,
  MyLikedPostsListResponse,
  MyPostsListResponse,
  MyReportsListResponse,
  MyLikedStoreListResponse,
} from "@/types/mypage";

//1) 내 프로필 조회 GET /mypage/profile
export const getMyProfile = () => {
  return clientFetcher<MyProfileResponse>("/mypage/profile", {
    method: "GET",
    auth: "private",
  });
};
export const getMyProfileData = async () => {
  const res = await getMyProfile();
  return res.data;
};

// 2) 내 프로필 수정 PATCH /mypage/profile
export const updateMyProfile = (payload: MyProfileUpdateRequest) => {
  return clientFetcher<ApiSuccessWrapper>("/mypage/profile", {
    method: "PATCH",
    auth: "private",
    body: JSON.stringify(payload),
  });
};
// 2.1) 내 프로필 수정 > 닉네임 중복검사
export const checkMyNickname = (nickname: string) =>
  clientFetcher<NicknameCheckResponse>(
    `/mypage/profile/check-nickname?nickname=${encodeURIComponent(nickname)}`,
    {
      method: "GET",
      auth: "private",
    },
  );

// 3) 비밀번호 변경 POST /mypage/password
export const changePassword = (payload: PasswordChangeRequest) => {
  return clientFetcher<ApiSuccessWrapper>("/mypage/password", {
    method: "POST",
    auth: "private",
    body: JSON.stringify(payload),
  });
};

// 4) 회원 탈퇴 POST /mypage/withdraw
export const withdraw = (password?: string) => {
  return clientFetcher<ApiSuccessWrapper>("/mypage/withdraw", {
    method: "POST",
    auth: "private",
    body: password ? JSON.stringify({ password }) : undefined,
  });
};

// 5) 내가 쓴 글 목록 GET /mypage/posts
export const getMyPosts = (params: { page?: number; page_size?: number } = {}) => {
  const search = new URLSearchParams();
  if (params.page) search.set("page", String(params.page));
  if (params.page_size) search.set("page_size", String(params.page_size));

  return clientFetcher<MyPostsListResponse>(
    `/mypage/posts${search.toString() ? `?${search.toString()}` : ""}`,
    {
      method: "GET",
      auth: "private",
    },
  );
};

// 6) 내가 좋아요한 글 목록 GET /mypage/likes/posts
export const getMyLikedPosts = (params: { page?: number; page_size?: number } = {}) => {
  const search = new URLSearchParams();
  if (params.page) search.set("page", String(params.page));
  if (params.page_size) search.set("page_size", String(params.page_size));

  return clientFetcher<MyLikedPostsListResponse>(
    `/mypage/likes/posts${search.toString() ? `?${search.toString()}` : ""}`,
    {
      method: "GET",
      auth: "private",
    },
  );
};

// 7) 내가 신고한 글 목록 GET /mypage/reports
export const getMyReports = (params: { page?: number; page_size?: number } = {}) => {
  const search = new URLSearchParams();
  if (params.page) search.set("page", String(params.page));
  if (params.page_size) search.set("page_size", String(params.page_size));

  return clientFetcher<MyReportsListResponse>(
    `/mypage/reports${search.toString() ? `?${search.toString()}` : ""}`,
    {
      method: "GET",
      auth: "private",
    },
  );
};

// 8) 관심 장소 목록 GET /mypage/favorites/places
export const getMyLikedStores = (params: { page?: number; page_size?: number } = {}) => {
  const search = new URLSearchParams();
  if (params.page) search.set("page", String(params.page));
  if (params.page_size) search.set("page_size", String(params.page_size));

  return clientFetcher<MyLikedStoreListResponse>(
    `/mypage/favorites/places${search.toString() ? `?${search.toString()}` : ""}`,
    {
      method: "GET",
      auth: "private",
    },
  );
};
