export interface ServerClientError extends Error {
  status: number;
  body?: unknown;
}

export interface ServerClientOptions extends RequestInit {
  query?: Record<string, string | number | boolean | undefined>;

  bodyType?: "json" | "raw";
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_SERVER_URL?.replace(/\/+$/, "") ??
  "https://virtserver.swaggerhub.com";

const API_BASE_PATH = `/pet_api/pet_API/1.0.0`;

function buildUrl(path: string, query?: ServerClientOptions["query"]): string {
  // const url = new URL(path.startsWith("/") ? path.slice(1) : path, BASE_URL);
  const url = new URL(`${API_BASE_PATH}${path}`, BASE_URL);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.append(key, String(value));
    });
    return url.toString();
  }
  return url.toString();
}

export async function serverClient<T>(path: string, options: ServerClientOptions = {}): Promise<T> {
  const {
    method = "GET",
    query,
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
    const err = new Error(`Server API Error: ${res.status}`) as ServerClientError;
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

export function get<T>(path: string, options: Omit<ServerClientOptions, "method">) {
  return serverClient<T>(path, { ...options, method: "GET" });
}

export function post<T>(
  path: string,
  body?: unknown,
  options?: Omit<ServerClientOptions, "method" | "body">,
) {
  return serverClient<T>(path, {
    ...options,
    method: "POST",
    body:
      options?.bodyType === "raw" || typeof body === "string" || body === undefined
        ? (body as BodyInit | null | undefined)
        : JSON.stringify(body),
    bodyType: options?.bodyType ?? "json",
  });
}
