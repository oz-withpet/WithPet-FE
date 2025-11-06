import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SubNav() {
  const pathname = usePathname();
  const isActive = pathname === "/mypage/profile";
  const isPostActive = pathname === "/mypage/posts";
  const isLikeActive = pathname === "/mypage/liked-posts";
  const isSaveActive = pathname === "/mypage/saved-places";
  const isReportedActive = pathname === "/mypage/reported-posts";

  return (
    <div className="flex h-12 w-full items-center justify-center border-b border-b-gray-200 bg-white">
      <div className="flex h-full w-[542px] items-center justify-between">
        <Link
          href="/mypage/profile"
          aria-current={isActive ? "page" : undefined}
          className="cursor-pointer text-gray-400 hover:font-bold hover:text-orange-400 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
        >
          프로필
        </Link>
        <Link
          href="/mypage/posts"
          aria-current={isPostActive ? "page" : undefined}
          className="cursor-pointer text-gray-400 hover:font-bold hover:text-orange-400 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
        >
          내가 작성한 게시글
        </Link>
        <Link
          href="/mypage/liked-posts"
          aria-current={isLikeActive ? "page" : undefined}
          className="cursor-pointer text-gray-400 hover:font-bold hover:text-orange-400 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
        >
          좋아요 게시글
        </Link>
        <Link
          href="/mypage/saved-places"
          aria-current={isSaveActive ? "page" : undefined}
          className="cursor-pointer text-gray-400 hover:font-bold hover:text-orange-400 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
        >
          관심 장소
        </Link>
        <Link
          href="/mypage/reported-posts"
          aria-current={isReportedActive ? "page" : undefined}
          className="cursor-pointer text-gray-400 hover:font-bold hover:text-orange-400 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
        >
          신고 게시글
        </Link>
      </div>
    </div>
  );
}
