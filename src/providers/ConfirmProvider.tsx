"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { createPortal } from "react-dom";

/* ---------- 타입 ---------- */
export type ConfirmOptions = {
  title?: string;
  description?: string;
  confirmText?: string; // 기본 "예"
  cancelText?: string; // 기본 "아니오"
  hideCancelButton?: boolean;
  variant?: "default" | "destructive";
  disableOutsideClick?: boolean;
};

type Resolver = (ok: boolean) => void;

/* ---------- Context / Hook ---------- */
const ConfirmCtx = createContext<(opts?: ConfirmOptions) => Promise<boolean>>(() => {
  throw new Error("ConfirmProvider로 감싸주세요.");
});

export function useConfirm() {
  return useContext(ConfirmCtx);
}

/* ---------- Provider ---------- */
export default function ConfirmProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [opts, setOpts] = useState<ConfirmOptions>({});
  const resolver = useRef<Resolver | null>(null);
  const mounted = useMounted();

  const confirm = useMemo(
    () => (options?: ConfirmOptions) =>
      new Promise<boolean>((resolve) => {
        resolver.current = resolve;
        setOpts(options ?? {});
        setOpen(true);
      }),
    [],
  );

  const close = useCallback((answer: boolean) => {
    setOpen(false);
    resolver.current?.(answer);
    resolver.current = null;
  }, []);

  return (
    <ConfirmCtx.Provider value={confirm}>
      {children}
      {mounted &&
        open &&
        createPortal(
          <ConfirmDialog
            open={open}
            onConfirm={() => close(true)}
            onCancel={() => close(false)}
            {...opts}
          />,
          document.body,
        )}
    </ConfirmCtx.Provider>
  );
}

/* ---------- 제어형 ConfirmDialog (원하면 단독 사용 가능) ---------- */
export function ConfirmDialog({
  open,
  onConfirm,
  onCancel,
  title = "확인",
  description,
  confirmText = "예",
  cancelText = "아니오",
  hideCancelButton = false,
  variant = "default",
  disableOutsideClick = false,
}: ConfirmOptions & {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // ESC 닫기 + 첫 버튼 포커스
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    // 최초 포커스
    const t = setTimeout(() => {
      panelRef.current?.querySelector<HTMLButtonElement>("[data-autofocus]")?.focus();
    }, 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onCancel]);

  if (!open) return null;

  const onBackdrop = () => {
    if (!disableOutsideClick) onCancel();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby={description ? "confirm-desc" : undefined}
      onClick={onBackdrop}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div
        ref={panelRef}
        className="relative z-10 w-[min(92vw,420px)] rounded-2xl border-4 border-orange-300 bg-orange-100 p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-title" className="text-lg font-semibold text-gray-900">
          {title}
        </h2>
        {description && (
          <p id="confirm-desc" className="mt-2 text-sm text-gray-600">
            {description}
          </p>
        )}

        <div className={`mt-5 flex ${hideCancelButton ? "justify-end" : "justify-center gap-10"}`}>
          {!hideCancelButton && (
            <button
              type="button"
              data-autofocus
              onClick={onCancel}
              className="rounded-lg border-2 border-orange-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-200"
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={onConfirm}
            className={
              variant === "destructive"
                ? "rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-200"
                : "rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
            }
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- utils ---------- */
export function useMounted() {
  const [m, setM] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setM(true)); // ← 다음 프레임으로 미룸
    return () => cancelAnimationFrame(id);
  }, []);

  return m;
}
