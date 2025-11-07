"use client";

import { useEffect } from "react";

export default function MSWProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      import("@/mocks/browers")
        .then(({ worker }) => worker.start())
        .then(() => console.log("[MSW] Mock Service Worker started"))
        .catch((err) => console.error("[MSW] Failed to start:", err));
    }
  }, []);

  return <>{children}</>;
}
