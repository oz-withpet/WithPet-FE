import Image from "next/image";

import { DUMMY_COMMENTS } from "@/mocks/data/comments";

export default function CommentForm() {
  return (
    <div className="hover:cursor-default">
      <form className="my-4 flex h-[96px] w-main flex-col items-center justify-center bg-gray-200">
        <input
          className="w-[930px] bg-white p-1 text-sm outline-none"
          placeholder="댓글을 입력해주세요."
        />
        <div className="flex w-[932px] items-center justify-end">
          <button className="my-2 rounded-3xl border-2 border-orange-300 bg-white px-5 py-1 text-xs hover:bg-orange-300 hover:text-white">
            등록
          </button>
        </div>
      </form>

      {DUMMY_COMMENTS?.length !== 0 ? (
        DUMMY_COMMENTS?.map((el) => (
          <div className="mb-3 rounded-sm border" key={el.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src={el.user.image}
                  alt={el.comment}
                  width={25}
                  height={25}
                  loading="lazy"
                  className="mr-2 rounded-full"
                />
                <div className="text-sm">{el.user.name}</div>
              </div>
              <div className="text-xs text-gray-400">{el.createdAt}</div>
            </div>
            <div className="py-3">{el.comment}</div>
            <div className="flex w-main justify-end">
              <div className="rounded-2xl border border-orange-300 px-3 py-1 text-xs hover:cursor-pointer hover:bg-orange-300 hover:font-semibold hover:text-white">
                수정하기
              </div>
              <button className="ml-2 rounded-2xl border border-red-600 px-3 py-1 text-xs hover:cursor-pointer hover:bg-red-600 hover:font-semibold hover:text-white">
                삭제하기
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex h-[100px] w-main items-center justify-center bg-gray-100 text-gray-300">
          아직 답변이 없습니다.
        </div>
      )}
    </div>
  );
}
