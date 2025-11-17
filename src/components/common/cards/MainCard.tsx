import Image from "next/image";
import Link from "next/link";

type MainCardProps = { id: number; thumbnail: string; writer: string; comment: string };

export default function MainCard({ id, thumbnail, writer, comment }: MainCardProps) {
  return (
    <Link
      href={`/community/${id}`}
      className="relative my-2 flex w-big flex-col hover:cursor-pointer"
    >
      <Image
        src={thumbnail}
        alt={thumbnail}
        width={470}
        height={300}
        loading="eager"
        className="h-[300px] w-big rounded-2xl bg-orange-200 object-cover transition hover:scale-105 hover:cursor-pointer"
      />
      <div className="flex flex-col">
        <div className="mb-2 text-lg font-semibold">{comment}</div>
        <div className="text-sm text-gray-400">{writer}</div>
      </div>
    </Link>
  );
}
