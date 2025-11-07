import Link from "next/link";
import { usePathname } from "next/navigation";

export function MyPagePostNav() {
  const pathname = usePathname();
  const isCutActive = pathname === "/mypage/posts/all";
  const isFreeActive = pathname === "/mypage/posts/free";
  const isQnaActive = pathname === "/mypage/posts/qna";
  const isInfoActive = pathname === "/mypage/posts/info";

  return (
    <div className="flex h-12 w-full items-center justify-center border-b border-b-gray-200 bg-white">
      <div className="flex h-full w-[424px] items-center justify-between">
        <Link
          href="/mypage/posts/all"
          aria-current={isCutActive ? "page" : undefined}
          className="cursor-pointer text-gray-400 hover:font-bold hover:text-orange-400 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
        >
          전체
        </Link>
        <Link
          href="/mypage/posts/free"
          aria-current={isFreeActive ? "page" : undefined}
          className="cursor-pointer text-gray-400 hover:font-bold hover:text-orange-400 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
        >
          자유게시판
        </Link>
        <Link
          href="/mypage/posts/qna"
          aria-current={isQnaActive ? "page" : undefined}
          className="cursor-pointer text-gray-400 hover:font-bold hover:text-orange-400 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
        >
          질문게시판
        </Link>
        <Link
          href="/mypage/posts/info"
          aria-current={isInfoActive ? "page" : undefined}
          className="cursor-pointer text-gray-400 hover:font-bold hover:text-orange-400 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
        >
          정보공유
        </Link>
      </div>
    </div>
  );
}
