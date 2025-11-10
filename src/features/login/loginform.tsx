// components/LoginForm.tsx
import Button from "@/components/common/button/Button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  return (
    <section className="mx-auto mb-10 mt-8 w-full max-w-wrapper rounded-[28px] bg-[#FFFDF4]">
      <div className="mx-auto flex max-w-[620px] flex-col items-center py-24">
        {/* 타이틀 */}
        <div className="mb-7 flex items-baseline gap-3">
          <span className="font-semibold text-gray-900">WithPet</span>
          <span className="text-sm text-black">로그인</span>
        </div>

        {/* 폼 (기능 없음, 스타일만) */}
        <form className="w-full space-y-5">
          <div>
            <Label>이메일</Label>
            <Input type="email" placeholder="이메일을 입력해주세요"/>         
          </div>

          <div>
            <Label>비밀번호</Label>
            <Input type="password" placeholder="비밀번호를 입력해주세요"/>         
          </div>


          <div className="pt-1 text-center">
        <Button className=" border-line-light transition hover:bg-[#ff9806]">로그인</Button>
          </div>
        </form>

        {/* 구분선 */}
        <div className="mt-10 w-full">
          <div className="mx-auto h-px w-[78%] bg-black" />
        </div>

        {/* 하단 링크 */}
        <div className="mt-6 flex items-center justify-center gap-10 text-sm font-bold text-black">
          <Link href="#">아이디 찾기</Link>
          <Link href="#">비밀번호 찾기</Link>
          <Link href="/signup">회원가입</Link>
        </div>
      </div>
    </section>
  );
}
