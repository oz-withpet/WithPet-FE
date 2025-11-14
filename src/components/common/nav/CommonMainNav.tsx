"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type PageName = "community" | "mypage";
type Category = "all" | "free" | "qna" | "info";
type CommonMainNavProps = { page: PageName };

const CATEGORY_LABELS = {
  all: "전체",
  free: "자유게시판",
  qna: "질문게시판",
  info: "정보공유",
};

const PAGE_CONFIG = {
  community: { base: "community", segment: "category" },
  mypage: { base: "mypage", segment: "myPosts" },
};

function buildHref(page: PageName, slug: Category) {
  const { base, segment } = PAGE_CONFIG[page];
  return `/${base}/${segment}/${slug}`;
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function CommonMainNav({ page }: CommonMainNavProps) {
  const pathname = usePathname();

  const items = (Object.keys(CATEGORY_LABELS) as Category[]).map((slug, i) => {
    const href = buildHref(page, slug);
    return {
      id: i + 1,
      href,
      text: CATEGORY_LABELS[slug],
      active: isActive(pathname, href),
    };
  });

  return (
    <div className="flex h-12 w-full items-center justify-center border-b border-b-gray-200 bg-white">
      <div className="flex h-full w-[424px] items-center justify-between">
        {items.map((el) => (
          <div key={el.id}>
            <Link
              href={el.href}
              aria-current={el.active ? "page" : undefined}
              className="cursor-pointer text-gray-400 hover:font-bold hover:text-orange-400 aria-[current=page]:font-semibold aria-[current=page]:text-orange-300"
            >
              {el.text}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
