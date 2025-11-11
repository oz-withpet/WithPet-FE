import { HeartSVG } from "@/shared/assets/icons/svgIcon";

type PickCardProp = { title: string; phone: string; address: string };

export default function PickCard({ title, phone, address }: PickCardProp) {
  return (
    <div className="flex w-[230px] flex-col bg-orange-100">
      <div className="h-[180px] w-full rounded-xl bg-orange-300" />
      <div className="flex items-center justify-between py-3">
        <div className="text-xl font-semibold text-gray-900 hover:cursor-default">{title}</div>
        <div className="hover:cursor-pointer">
          <HeartSVG size="20" color="#FF9806" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="w-full overflow-hidden overflow-ellipsis text-sm text-gray-500 hover:cursor-default">
          전화번호: {phone}
        </div>
        <div className="w-full overflow-hidden overflow-ellipsis text-sm text-gray-500 hover:cursor-default">
          {address}
        </div>
      </div>
    </div>
  );
}
