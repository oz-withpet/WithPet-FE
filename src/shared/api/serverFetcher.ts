import "server-only";

import { cookies } from "next/headers";

export interface ServerFetcherError extends Error {
  status: number;
  body?: unknown;
}

export interface ServerFetcherOptions extends RequestInit {
  query?: Record<string, string | number | boolean | undefined>;
  auth?: "public" | "private";
  bodyType?: "json" | "raw";
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_SERVER_URL?.replace(/\/+$/, "") ?? "https://oz-withpet.kro.kr";

async function getAccessTokenFromCookie() {
  const cookiesStore = await cookies(); // promise 타입으로 인식되어 있음.
  return cookiesStore.get("accessToken")?.value ?? null;
}

function buildUrl(path: string, query?: ServerFetcherOptions["query"]): string {
  const url = new URL(path.startsWith("/") ? path : `/${path}`, BASE_URL);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (typeof value !== "number" && !value) return;
      url.searchParams.append(key, String(value));
    });
    return url.toString();
  }
  return url.toString();
}

export async function serverFetcher<T>(
  path: string,
  options: ServerFetcherOptions = {},
): Promise<T> {
  const {
    method = "GET",
    query,
    auth = "public",
    bodyType = "json",
    body,
    headers,
    cache = "no-store",
    ...rest
  } = options;

  const url = buildUrl(path, query);

  const baseHeaders: Record<string, string> = {
    ...(bodyType === "json" ? { "Content-Type": "application/json" } : {}),
  };

  const finalHeaders: Record<string, string> = {
    ...baseHeaders,
    ...(headers as Record<string, string> | undefined),
  };

  if (auth === "private") {
    const token = await getAccessTokenFromCookie();
    if (token) {
      finalHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  const finalBody =
    bodyType === "json" && body && typeof body !== "string" ? JSON.stringify(body) : body;

  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: finalBody as BodyInit | null | undefined,
    cache,
    ...rest,
  });

  const parseBody = async () => {
    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      return res.json();
    }
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  };

  if (!res.ok) {
    const err = new Error(`Server API Error: ${res.status}`) as ServerFetcherError;
    err.status = res.status;
    try {
      err.body = await parseBody();
    } catch {
      err.body = null; // 파싱실패 무시
    }
    throw err;
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await parseBody()) as T;
}

export function get<T>(path: string, options: Omit<ServerFetcherOptions, "method">) {
  return serverFetcher<T>(path, { ...(options ?? {}), method: "GET" });
}

export function post<T>(
  path: string,
  body?: unknown,
  options?: Omit<ServerFetcherOptions, "method" | "body">,
) {
  return serverFetcher<T>(path, {
    ...options,
    method: "POST",
    body:
      options?.bodyType === "raw" || typeof body === "string" || body === undefined
        ? (body as BodyInit | null | undefined)
        : JSON.stringify(body),
    bodyType: options?.bodyType ?? "json",
  });
}
