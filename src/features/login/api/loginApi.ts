import { clientFetcher, type ClientFetcherError } from "@/shared/api/clientFetcher";
import type { LoginErrorResponse, LoginRequestPayload, LoginSuccessResponse } from "@/types/login";

export interface LoginResult {
  status: number;
  body: LoginSuccessResponse | LoginErrorResponse | null;
}

/**
 *
 * 백엔드용 client에 /auth/login/ 경로와 JSON 바디를 넘기고, 성공·실패 여부를 status + body로 정리
 */
export const loginRequest = async (payload: LoginRequestPayload): Promise<LoginResult> => {
  try {
    const data = await clientFetcher<LoginSuccessResponse>("/auth/login/", {
      method: "POST",
      bodyType: "json",
      auth: "public",
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return { status: 200, body: data };
  } catch (error) {
    const backendError = error as ClientFetcherError;
    return {
      status: backendError.status ?? 500,
      body: (backendError.body as LoginErrorResponse) ?? null,
    };
  }
};
