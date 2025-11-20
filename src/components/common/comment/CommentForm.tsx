import type { CommentItemSummary } from "@/features/community/api/type";
import { toRelativeKorean } from "@/lib/relativeTime";

type Props = {
  items: CommentItemSummary[];
};

export default function CommentForm({ items }: Props) {
  return (
    <div className="hover:cursor-default">
      <form className="my-4 flex h-[96px] w-main flex-col items-center justify-center bg-gray-200">
        <input
          disabled
          className="w-[930px] bg-white p-1 text-sm outline-none disabled:bg-gray-100"
          placeholder="댓글을 입력해주세요."
        />
        <div className="flex w-[932px] items-center justify-end">
          <button
            disabled
            className="disabled: border-grey-300 my-2 rounded-3xl border-2 bg-white px-5 py-1 text-xs disabled:bg-gray-100"
          >
            등록
          </button>
        </div>
      </form>

      {items?.length !== 0 ? (
        items?.map((el) => (
          <div className="mb-3 rounded-sm border" key={el.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-2 h-[25px] w-[25px] rounded-full bg-orange-300" />
                <div className="text-sm">{el.author.nickname}</div>
              </div>
              <div className="text-xs text-gray-400">{toRelativeKorean(el.created_at)}</div>
            </div>
            <div className="py-3">{el.content}</div>
            <div className="flex w-main justify-end">
              {/* <div className="rounded-2xl border border-orange-300 px-3 py-1 text-xs hover:cursor-pointer hover:bg-orange-300 hover:font-semibold hover:text-white">
                수정하기
              </div>
              <button className="ml-2 rounded-2xl border border-red-600 px-3 py-1 text-xs hover:cursor-pointer hover:bg-red-600 hover:font-semibold hover:text-white">
                삭제하기
              </button> */}
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
