export type LoginRequestPayload = {
  email: string;
  password: string;
};

export type LoginSuccessResponse = {
  access: string;
};

export type LoginErrorResponse = {
  detail?: string;
  message?: string;
};

export const isLoginSuccessResponse = (body: unknown): body is LoginSuccessResponse =>
  Boolean(body && typeof body === "object" && "access" in body);

export const isLoginErrorResponse = (body: unknown): body is LoginErrorResponse =>
  Boolean(body && typeof body === "object" && ("detail" in body || "message" in body));
