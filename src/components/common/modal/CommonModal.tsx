"use client";

import * as React from "react";

type Variant = "default" | "success" | "error";

export type ConfirmModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  onConfirm?: () => void;
  variant?: Variant; // 라인/배경 토큰
  // 필요 시 크기 조절
  maxWidthPx?: number; // 기본 640
};
