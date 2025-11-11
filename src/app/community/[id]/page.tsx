"use client";

import { usePathname } from "next/navigation";

export default function PostDetailPage() {
  const pathname = usePathname();
  return <div className="text-8xl font-bold text-gray-900">{pathname}</div>;
}
