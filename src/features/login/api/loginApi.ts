import { backendClient, type BackendError } from "@/shared/api/clientFeacher";
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
    const data = await backendClient<LoginSuccessResponse>("/auth/login/", {
      method: "POST",
      bodyType: "json",
      auth: "public",
      body: JSON.stringify(payload),
    });

    return { status: 200, body: data };
  } catch (error) {
    const backendError = error as BackendError;
    return {
      status: backendError.status ?? 500,
      body: (backendError.body as LoginErrorResponse) ?? null,
    };
  }
};
