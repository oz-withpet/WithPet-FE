"use client";

import { useState } from "react";

import Button from "@/components/common/button/Button";
import { type ButtonStatus } from "@/types/ui";

interface FilterCategory {
  label: string;
  status: ButtonStatus;
}

const filters: FilterCategory[] = [
  { label: "병원", status: "primary" },
  { label: "호텔", status: "default" },
  { label: "펫샵", status: "danger" },
  { label: "신고", status: "report" },
  { label: "비활성화", status: "disable" },
];

export default function MapButtonGroup() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleClick = (label: string) => {
    setActiveCategory((prev) => (prev === label ? null : label));
  };

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {filters.map(({ label, status }) => (
        <Button
          key={label}
          status={status}
          className="rounded-[4px]"
          isActive={activeCategory === label}
          onClick={() => handleClick(label)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
