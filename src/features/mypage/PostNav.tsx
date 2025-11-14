import Link from "next/link";
import { usePathname } from "next/navigation";

export function MyPagePostNav() {
  const pathname = usePathname();
  const isCutActive = pathname === "/mypage/myPosts/all";
  const isFreeActive = pathname === "/mypage/myPosts/free";
  const isQnaActive = pathname === "/mypage/myPosts/qna";
  const isInfoActive = pathname === "/mypage/myPosts/info";

  return (
    <div className="flex h-12 w-full items-center justify-center border-b border-b-gray-200 bg-white">
      <div className="flex h-full w-[424px] items-center justify-between">
        <Link
          href="/mypage/myPosts/all"
          aria-current={isCutActive ? "page" : undefined}
          className="cursor-pointer text-gray-400 hover:font-bold hover:text-orange-400 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
        >
          전체
        </Link>
        <Link
          href="/mypage/myPosts/free"
          aria-current={isFreeActive ? "page" : undefined}
          className="cursor-pointer text-gray-400 hover:font-bold hover:text-orange-400 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
        >
          자유게시판
        </Link>
        <Link
          href="/mypage/myPosts/qna"
          aria-current={isQnaActive ? "page" : undefined}
          className="cursor-pointer text-gray-400 hover:font-bold hover:text-orange-400 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
        >
          질문게시판
        </Link>
        <Link
          href="/mypage/myPosts/info"
          aria-current={isInfoActive ? "page" : undefined}
          className="cursor-pointer text-gray-400 hover:font-bold hover:text-orange-400 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
        >
          정보공유
        </Link>
      </div>
    </div>
  );
}
