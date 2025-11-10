import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyPageProfileNav() {
  const pathname = usePathname();
  const isCutActive = pathname === "/mypage/profile/edit";
  const isFreeActive = pathname === "/mypage/profile/password";

  return (
    <div className="flex h-12 w-full items-center justify-center border-b border-b-gray-200 bg-white">
      <div className="flex h-full w-[424px] items-center justify-between">
        <Link
          href="/mypage/profile/edit"
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
