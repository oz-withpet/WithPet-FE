import Button from "@/components/common/button/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupForm() {
  return (
    <section className="mx-auto w-full max-w-wrapper rounded-[28px] bg-background-100">
      <div className="mx-auto flex max-w-[620px] flex-col items-center py-20">
        {/* 타이틀 */}
        <div className="mb-8 flex items-baseline gap-[12px]">
          <span className="font-semibold text-gray-900">WithPet</span>
          <span className="text-sm text-gray-900">회원가입</span>
        </div>

        {/* 폼 (스타일 전용) */}
        <form className="w-full space-y-[12px]">
          {/* 안내 문구 */}
          <div className="mb-[15px] w-full text-[13px] text-gray-100">
            <p className="text-[17px] font-semibold text-gray-900">반려동물 유무</p>
            <p className="text-[12px] text-gray-300">· 선택 안할 시 ‘없음’으로 저장됩니다.</p>
          </div>

          {/* 반려동물 유무 (선택) — 버튼형 체크박스 (id + htmlFor) */}
          <div className="flex items-center gap-[12px]">
            {/* 강아지 */}
            <div>
              <input 
              id="pet-dog" 
              name="pet_dog" 
              type="checkbox" 
              className="peer sr-only" />
              <Label
                htmlFor="pet-dog"
                className="cursor-pointer rounded-full border border-line-strong px-[16px] py-[8px] text-[14px] text-gray-900
                          peer-checked:bg-orange-300 peer-checked:border-line-strong peer-checked:text-gray-50
                          hover:bg-orange-300 hover:text-gray-50
                          peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-orange-200"
              >
                강아지
              </Label>
            </div>
            {/* 고양이 */}
            <div>
              <input 
              id="pet-cat" 
              name="pet_cat" 
              type="checkbox" 
              className="peer sr-only" />
              <Label
                htmlFor="pet-cat"
                className="cursor-pointer rounded-full border border-line-strong px-[16px] py-[8px] text-[14px] text-gray-900
                          peer-checked:bg-orange-300 peer-checked:border-line-strong peer-checked:text-gray-50
                          hover:bg-orange-300 hover:text-gray-50
                          peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-orange-200"
              >
                고양이
              </Label>
            </div>
          </div>

          {/* 성별 (필수) — 버튼형 라디오 (id + htmlFor) */}
          <div className="mt-[12px]">
            <p className="mb-[8px] text-[17px] font-semibold text-gray-900">
              성별 <span className="text-warning">* 필수</span>
            </p>

            <div className="flex items-center gap-[12px]">
              <div>
                <input
                  id="male"
                  type="radio"
                  name="gender"
                  value="남자"
                  required
                  className="peer sr-only"
                />
                <Label
                  htmlFor="male"
                  className="cursor-pointer rounded-full border border-line-strong px-[16px] py-[8px] text-[14px] text-gray-900
                            peer-checked:bg-orange-300 peer-checked:border-line-strong
                            hover:bg-orange-300 hover:text-gray-50
                            peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-orange-200">
                              남자
                </Label>
              </div>
              <div>
                <input 
                id="female" 
                type="radio" 
                name="gender" 
                value="여자" 
                className="peer sr-only" 
                required/>
                <Label
                  htmlFor="female"
                  className="cursor-pointer rounded-full border border-line-strong px-[16px] py-[8px] text-[14px] text-gray-900
                            peer-checked:bg-orange-300 peer-checked:border-line-strong
                            hover:bg-orange-300 hover:text-gray-50
                            peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-orange-200">
                              여자
                </Label>
              </div>
            </div>
          </div>

          {/* 이름 */}
          <div>
            <Input placeholder="[필수] 성명을 입력해 주세요" />
          </div>

          {/* 닉네임 + 중복검사 */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-[12px]">
            <Input placeholder="[필수] 닉네임을 입력해 주세요" />
            <Button className="rounded-full border-line-strong px-[12px] text-[12px] transition hover:bg-orange-300">
              중복검사
            </Button>
          </div>

          {/* 이메일 + 인증하기 */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-[12px]">
            <Input type="email" placeholder="[필수] 이메일을 입력해 주세요" />
            <Button className="rounded-full border-line-strong px-[12px] text-[12px] transition hover:bg-orange-300">
              인증하기
            </Button>
          </div>

          {/* 인증번호 */}
          <div>
            <Input placeholder="인증번호 입력" />
          </div>

          {/* 비밀번호 */}
          <div className="space-y-[4px]">
            <Input type="password" placeholder="[필수] 비밀번호를 입력해 주세요" />
            <p className="text-[12px] text-gray-300">· 비밀번호는 8자 이상/대소문자 혼합이어야 합니다.</p>
          </div>

          {/* 비밀번호 확인 */}
          <div className="space-y-[4px]">
            <Input type="password" placeholder="[필수] 비밀번호를 확인해 주세요" />
            <p className="text-[12px] text-gray-300">· 위 비밀번호와 동일하게 작성해주세요.</p>
          </div>

          {/* 개인정보 동의 */}
          <section className="mt-[24px] w-full rounded-[16px] border border-line-light bg-white p-[20px]">
            <div className="mb-[12px] flex items-center justify-between">
              <label className="flex items-center gap-[8px] text-[14px] font-semibold text-gray-900">
                <input type="checkbox" className="h-[16px] w-[16px] accent-orange-300" />
                전체 동의
              </label>
              <span className="text-[12px] text-gray-400">선택 포함</span>
            </div>

            <div className="mb-[12px] h-[1px] w-full bg-gray-300" />

            <ul className="flex flex-col gap-[12px]">
              <li className="flex items-start justify-between gap-[12px]">
                <label className="flex flex-1 items-start gap-[8px] text-[14px] text-gray-900">
                  <input type="checkbox" className="mt-[3px] h-[16px] w-[16px] accent-orange-300" />
                  <span className="leading-[22px]">
                    이용약관 동의 <span className="text-warning">*</span>
                  </span>
                </label>
                <Button className="shrink-0 rounded-full border border-line-strong px-[12px] py-[6px] text-[12px] text-gray-900 transition hover:bg-orange-300">
                  자세히
                </Button>
              </li>

              <li className="flex items-start justify-between gap-[12px]">
                <label className="flex flex-1 items-start gap-[8px] text-[14px] text-gray-900">
                  <input type="checkbox" className="mt-[3px] h-[16px] w-[16px] accent-orange-300" />
                  <span className="leading-[22px]">
                    개인정보 수집 및 이용 동의 <span className="text-warning">*</span>
                  </span>
                </label>
                <Button className="shrink-0 rounded-full border border-line-strong px-[12px] py-[6px] text-[12px] text-gray-900 transition hover:bg-orange-300">
                  자세히
                </Button>
              </li>

              <li className="flex items-start justify-between gap-[12px]">
                <label className="flex flex-1 items-start gap-[8px] text-[14px] text-gray-900">
                  <input type="checkbox" className="mt-[3px] h-[16px] w-[16px] accent-orange-300" />
                  <span className="leading-[22px]">마케팅 정보 수신 동의 (선택)</span>
                </label>
                <Button className="shrink-0 rounded-full border border-line-strong px-[12px] py-[6px] text-[12px] text-gray-900 transition hover:bg-orange-300">
                  자세히
                </Button>
              </li>
            </ul>
          </section>

          {/* 제출 버튼 */}
          <div className="pt-[8px] text-center">
            <Button className="inline-block rounded-full border border-line-strong px-[32px] py-[8px] text-sm font-semibold text-gray-900 transition hover:bg-orange-300 active:scale-[0.99]">회원가입</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
