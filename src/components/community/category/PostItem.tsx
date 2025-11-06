type PostItemProps = { title: string };

export default function PostItem({ title }: PostItemProps) {
  return (
    <div className="w-main my-2 flex flex-col rounded-sm bg-gray-100">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex w-[838px] items-center justify-between">
            <div className="text-2xl font-semibold text-black">{title}</div>
            <div className="text-gray-400">좋아요</div>
          </div>
          <div className="mt-4">
            <div className="w-[838px] font-bold text-black">제목</div>
            <div className="line-clamp-2 h-[42px] w-[838px] text-sm text-gray-400">
              블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라
            </div>
          </div>
        </div>
        <div className="h-[124px] w-[124px] rounded-xl bg-thumbnail-200 text-gray-400" />
      </div>
      <div className="text-gray-400"> 작성자, 댓글, 올린 날짜</div>
    </div>
  );
}
