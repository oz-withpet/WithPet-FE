export default function ProfileEditForm() {
  return (
    <div className="flex w-wrapper items-center justify-center bg-orange-100 p-40 text-gray-900">
      <div className="flex w-edit flex-col rounded-xl border border-gray-300 p-3 hover:cursor-default">
        <div className="mb-9 flex w-full items-center justify-center p-3 text-2xl">
          {"닉네임"}님 프로필 수정
        </div>

        <div className="flex flex-col justify-between">
          <div className="my-2 flex flex-col">
            <div className="mb-3 text-lg">닉네임</div>
            <div className="flex w-full items-start justify-between">
              <div>
                <input
                  type="text"
                  className="w-[330px] rounded-xl border-2 border-orange-300 bg-white p-2.5 outline-none"
                  placeholder="변경할 닉네임을 작성해주세요."
                />
                <div className="text-sm text-gray-300">3자 이상 작성해주세요.</div>
              </div>
              <div className="rounded-lg border-2 border-orange-300 bg-white p-2.5 font-semibold hover:cursor-pointer hover:bg-orange-300 hover:text-white">
                중복 검사
              </div>
            </div>
          </div>
          <div className="my-2 flex flex-col">
            <div className="mb-3 flex items-center text-red-500">
              <div className="mr-2 text-lg text-gray-900">성별</div> * 필수
            </div>
            <div className="flex items-center">
              <div className="rounded-full border-2 border-orange-300 bg-white px-4 py-2 text-lg font-semibold hover:cursor-pointer hover:bg-orange-300 hover:font-bold hover:text-white">
                남자
              </div>
              <div className="ml-12 rounded-full border-2 border-orange-300 bg-white px-4 py-2 text-lg font-semibold hover:cursor-pointer hover:bg-orange-300 hover:font-bold hover:text-white">
                여자
              </div>
            </div>
          </div>
          <div className="my-2 flex flex-col">
            <div className="mb-3 mr-2 text-lg text-gray-900">반려동물 유무</div>
            <div className="flex items-center">
              <div className="rounded-full border-2 border-orange-300 bg-white px-4 py-2 text-lg font-semibold hover:cursor-pointer hover:bg-orange-300 hover:font-bold hover:text-white">
                강아지
              </div>
              <div className="ml-10 rounded-full border-2 border-orange-300 bg-white px-4 py-2 text-lg font-semibold hover:cursor-pointer hover:bg-orange-300 hover:font-bold hover:text-white">
                고양이
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
