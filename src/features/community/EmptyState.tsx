type EmptyStateProps = { content: string };

export default function EmptyState({ content }: EmptyStateProps) {
  return (
    <div className="flex h-[820px] w-wrapper flex-col items-center justify-center bg-orange-100">
      <div className="mb-14 text-xl font-bold text-gray-900">WithPet</div>
      <div className="text-2xl font-bold text-orange-600">{content}</div>
    </div>
  );
}
