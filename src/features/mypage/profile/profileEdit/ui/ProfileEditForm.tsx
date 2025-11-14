import NicknameCheckForm from "@/components/common/input/NickNameCheckForm";
import { GenderField } from "@/components/common/radio/GenderRadio";
import PetTypeField from "@/components/common/radio/PetTypeForm";

export default function ProfileEditForm() {
  // const onCheck = async (nickname: string) => {
  //   return alert("사용 가능한 닉네임이예요!");
  // 여기서 API 호출 (예시)
  // const res = await fetch(`/api/nickname/check?nickname=${encodeURIComponent(nickname)}`);
  // const data = await res.json();
  // if (data.isAvailable) {
  //   alert("사용 가능한 닉네임이에요!");
  // } else {
  //   alert("이미 사용 중인 닉네임입니다.");
  // }
  // };

  return (
    <div className="flex w-wrapper items-center justify-center bg-orange-100 p-40 text-gray-900">
      <div className="flex w-edit flex-col rounded-xl border border-gray-300 p-3 hover:cursor-default">
        <div className="mb-9 flex w-full items-center justify-center p-3 text-2xl">
          {"닉네임"}님 프로필 수정
        </div>

        <form className="flex flex-col justify-between">
          <div className="my-2 flex flex-col">
            <div className="mb-3 text-lg">닉네임</div>
            <NicknameCheckForm currentNickname="닉네임a" />
          </div>
          <div className="my-2 flex flex-col">
            <div className="mb-3 flex items-center text-red-500">
              <div className="mr-2 text-lg text-gray-900">성별</div> * 필수
            </div>
            <GenderField />
          </div>
          <div className="my-2 flex flex-col">
            <div className="mb-3 mr-2 text-lg text-gray-900">반려동물 유무</div>
            <PetTypeField defaultValue="none" />
          </div>

          <button
            type="submit" // ← submit 이어야 내장 검증이 트리거됨
            className="mt-5 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 font-semibold hover:bg-orange-300 hover:text-white"
          >
            수정하기
          </button>
        </form>
      </div>
    </div>
  );
}
