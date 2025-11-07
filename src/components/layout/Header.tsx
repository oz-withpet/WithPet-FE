import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isMapActive = /^\/map(\/|$)/.test(pathname);
  const isCutActive = /^\/community(\/|$)/.test(pathname);

  return (
    <header className="flex h-12 w-full items-center justify-center border-b border-b-gray-200 bg-white">
      <nav className="w-wrapper flex items-center justify-between">
        <div className="flex w-[285px] items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-900">
            WithPet
          </Link>
          <Link
            href="/map"
            aria-current={isMapActive ? "page" : undefined}
            className="text-gray-400 hover:text-orange-300 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
          >
            지도
          </Link>
          <Link
            href="/community/category/all"
            aria-current={isCutActive ? "page" : undefined}
            className="text-gray-400 hover:text-orange-300 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
          >
            커뮤니티
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Link
            href="/login"
            className="border-line-100 mx-2 rounded-md border-[1px] p-2 text-gray-900 hover:bg-black hover:text-white"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="border-line-100 rounded-md border-[1px] p-2 text-gray-900 hover:bg-black hover:text-white"
          >
            회원가입
          </Link>
        </div>
      </nav>
    </header>
  );
}
