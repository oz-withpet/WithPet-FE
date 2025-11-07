import Link from "next/link";
import { usePathname } from "next/navigation";

export function MyPageMainNav() {
  const pathname = usePathname();
  const isActive = pathname.includes("/mypage/profile");
  const isPostActive = pathname.includes("/mypage/posts");
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
          href="/mypage/posts/all"
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

export function MyPageProfileNav() {
  const pathname = usePathname();
  const isCutActive = pathname === "/mypage/profile";
  const isFreeActive = pathname === "/mypage/profile/password";

  return (
    <div className="flex h-12 w-full items-center justify-center border-b border-b-gray-200 bg-white">
      <div className="flex h-full w-[424px] items-center justify-between">
        <Link
          href="/mypage/profile"
          aria-current={isCutActive ? "page" : undefined}
          className="cursor-pointer text-gray-400 hover:font-bold hover:text-orange-400 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
        >
          프로필 수정
        </Link>
        <Link
          href="/mypage/profile/password"
          aria-current={isFreeActive ? "page" : undefined}
          className="cursor-pointer text-gray-400 hover:font-bold hover:text-orange-400 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
        >
          비밀번호 변경
        </Link>
      </div>
    </div>
  );
}

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
