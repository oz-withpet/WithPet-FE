export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface LoginSuccessBody {
  access: string;
  refresh: string;
  message?: string;
}

export interface LoginErrorBody {
  detail?: string;
  message?: string;
}

export interface LoginApiResult {
  status: number;
  body: LoginSuccessBody | LoginErrorBody | null;
}

export const isLoginSuccessBody = (body: unknown): body is LoginSuccessBody =>
  Boolean(
    body &&
      typeof body === "object" &&
      "access" in body &&
      "refresh" in body,
  );

export const isLoginErrorBody = (body: unknown): body is LoginErrorBody =>
  Boolean(body && typeof body === "object" && ("detail" in body || "message" in body));
