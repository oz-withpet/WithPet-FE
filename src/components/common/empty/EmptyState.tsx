import { useRouter } from "next/router";

type EmptyStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  routerPush?: string;
};

export default function EmptyState({
  title = "표시할 게시글이 없습니다.",
  description,
  actionLabel,
  routerPush,
}: EmptyStateProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="mt-1 text-xs text-gray-400">{description}</p>}
      {actionLabel && routerPush && (
        <button
          type="button"
          onClick={() => router.push(routerPush)}
          className="mt-4 rounded-2xl border border-orange-400 px-4 py-1.5 text-xs font-medium text-orange-500 hover:bg-orange-50"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
