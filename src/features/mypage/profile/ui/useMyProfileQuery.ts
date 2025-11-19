import { useQuery } from "@tanstack/react-query";

import { MyProfileData } from "@/types/mypage";

import { getMyProfileData } from "../../api/mypageApi";

export function useMyProfileQuery() {
  return useQuery<MyProfileData>({
    queryKey: ["mypage", "profile"],
    queryFn: getMyProfileData,
    staleTime: 1000 * 10,
  });
}
