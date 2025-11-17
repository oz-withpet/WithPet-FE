"use client";

import { type ReactNode, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 데이터 신선도(재요청 타이밍) 기본 값
            staleTime: 1000 * 10, // 10초 동안은 fresh 취급
            refetchOnWindowFocus: false, // 화면 다시 포커스 될 때 재요청 여부
            retry: 1, // 실패 시 재시도 횟수
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
