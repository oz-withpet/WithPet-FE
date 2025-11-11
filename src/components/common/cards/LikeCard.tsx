import { LikeSVG, UserSVG } from "@/shared/assets/icons/svgIcon";

type LikeCardProp = { title: string; content: string; comment: number; day: number; user: string };

export default function LikeCard({ title, content, comment, day, user }: LikeCardProp) {
  return (
    <div className="flex h-[315px] w-[230px] flex-col bg-orange-100">
      <div className="h-[180px] w-full rounded-xl bg-orange-300" />
      <div className="flex items-center justify-between py-3">
        <div className="text-xl font-semibold text-gray-900 hover:cursor-default">{title}</div>
        <div className="flex h-8 w-10 items-center justify-center rounded-3xl bg-orange-300 hover:cursor-pointer">
          <LikeSVG size="20" color="white" />
        </div>
      </div>
      <div className="h-[42px] w-full overflow-hidden overflow-ellipsis text-sm text-gray-500 hover:cursor-default">
        {content}
      </div>
      <div className="flex items-center justify-between py-3 text-xs hover:cursor-default">
        <div className="flex items-center">
          <UserSVG size="16" color="#CFCECE" />
          <div className="ml-1">{user}</div>
        </div>
        <div>댓글: {comment}</div>
        <div>{day}일 전</div>
      </div>
    </div>
  );
}
