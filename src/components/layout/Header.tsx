import Link from "next/link";
import { usePathname } from "next/navigation";

import Button from "../common/button/Button";

export default function Header() {
  const pathname = usePathname();
  const isMapActive = /^\/map(\/|$)/.test(pathname);
  const isCutActive = /^\/community(\/|$)/.test(pathname);

  return (
    <header className="flex h-[60px] w-full items-center justify-center border-b border-b-gray-200 bg-white">
      <nav className="flex w-wrapper items-center justify-between">
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
          <Link href="/login" className="mx-2">
            <Button className="rounded-md border-[1px] p-2">로그인</Button>
          </Link>
          <Link href="/signup" className="mx-2">
            <Button className="rounded-md border-[1px] p-2">회원가입</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
