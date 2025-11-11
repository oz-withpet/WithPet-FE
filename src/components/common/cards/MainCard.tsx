type MainCardProps = { writer: string; comment: string };

export default function MainCard({ writer, comment }: MainCardProps) {
  return (
    <div className="my-2 flex w-big flex-col hover:cursor-pointer">
      <div className="h-[300px] w-big rounded-2xl bg-orange-200" />
      <div className="flex flex-col">
        <div className="mb-2 text-lg font-semibold">{comment}</div>
        <div className="text-sm text-gray-400">{writer}</div>
      </div>
    </div>
  );
}
