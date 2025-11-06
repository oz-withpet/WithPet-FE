export default function SignupForm() {
  return (
    <section className="mx-auto w-full max-w-wrapper rounded-[28px] bg-background-100">
      <div className="mx-auto flex max-w-[620px] flex-col items-center py-20">
        {/* 타이틀 */}
        <div className="mb-8 flex items-baseline gap-[12px]">
          <span className="font-semibold text-gray-900">WithPet</span>
          <span className="text-sm text-gray-900">회원가입</span>
        </div>

        {/* 안내 문구 */}
        <div className="mb-[15px] w-full text-[13px] text-gray-100">
          <p className="font-semibold text-gray-900">반려동물 유무</p>
          <p className="text-[12px] text-gray-300">· 선택 안할 시 ‘없음’으로 저장됩니다.</p>
        </div>

        {/* 반려동물 유무 */}
        <div className="mb-[15px] flex w-full items-center gap-[12px]">
          <button
            type="button"
            className="rounded-full border border-line-strong px-[16px] py-[8px] text-sm text-gray-900"
          >
            강아지
          </button>
          <button
            type="button"
            className="rounded-full border border-line-strong px-[16px] py-[8px] text-sm text-gray-900"
          >
            고양이
          </button>
        </div>

        {/* 성별 */}
        <div className="mb-[8px] flex w-full items-center gap-[12px]">
          <span className="text-sm text-gray-900">
            성별 <span className="text-warning">* 필수</span>
          </span>
        </div>
        <div className="mb-[20px] flex w-full items-center gap-[12px]">
          <button
            type="button"
            className="rounded-full border border-line-strong px-[16px] py-[8px] text-sm text-gray-900"
          >
            남자
          </button>
          <button
            type="button"
            className="rounded-full border border-line-strong px-[16px] py-[8px] text-sm text-gray-900"
          >
            여자
          </button>
        </div>

        {/* 입력 폼 (기능 없음) */}
        <form className="w-full space-y-[16px]">
          {/* 이름 */}
          <input
            type="text"
            placeholder="[필수] 성명을 입력해주세요."
            className="w-full rounded-[12px] border border-line-light bg-white px-[16px] py-[12px] text-sm text-gray-900 outline-none transition focus:border-line-strong focus:ring-2 focus:ring-orange-200"
          />

          {/* 닉네임 + 중복검사 */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-[12px]">
            <input
              type="text"
              placeholder="[필수] 닉네임을 작성해주세요."
              className="rounded-[12px] border border-line-light bg-white px-[16px] py-[12px] text-sm text-gray-900 outline-none transition focus:border-line-strong focus:ring-2 focus:ring-orange-200"
            />
            <button
              type="button"
              className="rounded-full border border-line-strong px-[16px] py-[8px] text-sm text-gray-900"
            >
              중복 검사
            </button>
          </div>

          {/* 이메일 + 인증하기 */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <input
              type="email"
              placeholder="[필수] 이메일을 입력해주세요."
              className="rounded-[12px] border border-line-light bg-white px-[16px] py-[12px] text-sm text-gray-900 outline-none transition focus:border-line-strong focus:ring-2 focus:ring-orange-200"
            />
            <button
              type="button"
              className="rounded-full border border-line-strong px-[16px] py-[8px] text-sm text-gray-900"
            >
              인증하기
            </button>
          </div>

          {/* 인증번호 */}
          <input
            type="text"
            placeholder="인증번호 입력"
            className="w-full rounded-[12px] border border-line-light bg-white px-[16px] py-[12px] text-sm text-gray-900 outline-none transition focus:border-line-strong focus:ring-2 focus:ring-orange-200"
          />

          {/* 비밀번호 */}
          <div className="space-y-[4px]">
            <input
              type="password"
              placeholder="[필수] 비밀번호를 입력해주세요."
              className="w-full rounded-[12px] border border-line-light bg-white px-[16px] py-[12px] text-sm text-gray-900 outline-none transition focus:border-line-strong focus:ring-2 focus:ring-orange-200"
            />
            <p className="text-[12px] text-gray-300">
              · 비밀번호는 8자 이상/대소문자 혼합이어야 합니다.
            </p>
          </div>

          {/* 비밀번호 확인 */}
          <div className="space-y-[4px]">
            <input
              type="password"
              placeholder="[필수] 비밀번호를 입력해주세요."
              className="w-full rounded-[12px] border border-line-light bg-white px-[16px] py-[12px] text-sm text-gray-900 outline-none transition focus:border-line-strong focus:ring-2 focus:ring-orange-200"
            />
            <p className="text-[12px] text-gray-300">· 위 비밀번호와 동일하게 작성해주세요.</p>
          </div>

          {/* 개인정보 동의 */}
          <section className="mt-[24px] w-full rounded-[16px] border border-line-light bg-white p-[20px]">
            {/* 상단: 전체 동의 */}
            <div className="mb-[12px] flex items-center justify-between">
              <label className="flex items-center gap-[8px] text-[14px] font-semibold text-gray-900">
                <input type="checkbox" className="h-[16px] w-[16px] accent-orange-300" />
                전체 동의
              </label>
              <span className="text-[12px] text-gray-400">선택 포함</span>
            </div>

            {/* 구분선 */}
            <div className="mb-[12px] h-[1px] w-full bg-gray-300" />

            {/* 항목 리스트 */}
            <ul className="flex flex-col gap-[12px]">
              {/* (필수) 이용약관 동의 */}
              <li className="flex items-start justify-between gap-[12px]">
                <label className="flex flex-1 items-start gap-[8px] text-[14px] text-gray-900">
                  <input type="checkbox" className="mt-[3px] h-[16px] w-[16px] accent-orange-300" />
                  <span className="leading-[22px]">
                    이용약관 동의 <span className="text-warning">*</span>
                  </span>
                </label>
                <button
                  type="button"
                  className="shrink-0 rounded-full border border-line-strong px-[12px] py-[6px] text-[12px] text-gray-900"
                >
                  자세히
                </button>
              </li>

              {/* (필수) 개인정보 수집 및 이용 동의 */}
              <li className="flex items-start justify-between gap-[12px]">
                <label className="flex flex-1 items-start gap-[8px] text-[14px] text-gray-900">
                  <input type="checkbox" className="mt-[3px] h-[16px] w-[16px] accent-orange-300" />
                  <span className="leading-[22px]">
                    개인정보 수집 및 이용 동의 <span className="text-warning">*</span>
                  </span>
                </label>
                <button
                  type="button"
                  className="shrink-0 rounded-full border border-line-strong px-[12px] py-[6px] text-[12px] text-gray-900"
                >
                  자세히
                </button>
              </li>

              {/* (선택) 마케팅 정보 수신 동의 */}
              <li className="flex items-start justify-between gap-[12px]">
                <label className="flex flex-1 items-start gap-[8px] text-[14px] text-gray-900">
                  <input type="checkbox" className="mt-[3px] h-[16px] w-[16px] accent-orange-300" />
                  <span className="leading-[22px]">마케팅 정보 수신 동의 (선택)</span>
                </label>
                <button
                  type="button"
                  className="shrink-0 rounded-full border border-line-strong px-[12px] py-[6px] text-[12px] text-gray-900"
                >
                  자세히
                </button>
              </li>
            </ul>
          </section>

          {/* 제출 버튼 */}
          <div className="pt-[8px] text-center">
            <button
              type="button"
              className="inline-block rounded-full border border-line-strong px-[32px] py-[8px] text-sm font-semibold text-gray-900 transition hover:bg-orange-300 active:scale-[0.99]"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
