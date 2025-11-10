export default function MypageProfileForm() {
  return (
    <div className="flex w-wrapper items-center justify-center bg-orange-100 p-40 text-gray-900">
      <div className="flex w-edit flex-col rounded-xl border border-gray-300 p-3">
        <div className="mb-9 flex w-full items-center justify-center p-3 text-2xl">
          {"닉네임"}님 프로필
        </div>
        <div className="flex h-[285px] flex-col justify-between">
          <div className="flex items-center">
            이름:
            <div className="ml-2 rounded-full border-2 border-orange-300 bg-white px-5 py-1">
              {"이름"}
            </div>
          </div>
          <div className="flex items-center">
            성별:
            <div className="ml-2 rounded-full border-2 border-orange-300 bg-white px-5 py-1">
              {"남자"}
            </div>
          </div>
          <div className="flex items-center">
            이메일:
            <div className="ml-2 rounded-full border-2 border-orange-300 bg-white px-5 py-1">
              {"test@test.com"}
            </div>
          </div>
          <div className="flex items-center">
            닉네임:
            <div className="ml-2 rounded-full border-2 border-orange-300 bg-white px-5 py-1">
              {"닉네임"}
            </div>
          </div>
          <div className="flex items-center">
            반려동물 유무:
            <div className="ml-2 rounded-full border-2 border-orange-300 bg-white px-5 py-1">
              {"없음"}
            </div>
          </div>
        </div>
        <div className="my-10 flex w-full items-center justify-around">
          <div className="rounded-full border-2 border-orange-300 bg-white px-5 py-3 text-lg font-semibold hover:cursor-pointer hover:bg-orange-300 hover:font-bold hover:text-white">
            수정하기
          </div>
          <div className="rounded-full border-2 border-orange-300 bg-white px-5 py-3 text-lg font-semibold hover:cursor-pointer hover:bg-orange-300 hover:font-bold hover:text-white">
            비밀번호 변경
          </div>
          <div className="rounded-full border-2 border-orange-300 bg-white px-5 py-3 text-lg font-semibold hover:cursor-pointer hover:bg-orange-300 hover:font-bold hover:text-white">
            회원탈퇴
          </div>
        </div>
      </div>
    </div>
  );
}
