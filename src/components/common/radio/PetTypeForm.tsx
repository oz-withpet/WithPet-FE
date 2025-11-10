"use client";

export type PetType = "dog" | "cat" | "none";

export default function PetTypeField({
  name = "petType",
  defaultValue,
  required = true,
}: {
  name?: string;
  defaultValue?: PetType;
  required?: boolean;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="sr-only">반려동물 선택</legend>

      <div className="flex gap-2">
        <div>
          <input
            id={`${name}-dog`}
            type="radio"
            name={name}
            value="dog"
            className="peer sr-only"
            defaultChecked={defaultValue === "dog"}
            required={required} // 라디오 그룹 하나만 required면 그룹 전체에 적용
          />
          <label
            htmlFor={`${name}-dog`}
            className="rounded-full border-2 border-orange-300 bg-white px-4 py-2 text-lg font-semibold hover:cursor-pointer hover:bg-orange-300 hover:font-bold hover:text-white peer-checked:border-orange-300 peer-checked:bg-orange-300 peer-checked:text-white"
          >
            강아지
          </label>
        </div>

        <div>
          <input
            id={`${name}-cat`}
            type="radio"
            name={name}
            value="cat"
            className="peer sr-only"
            defaultChecked={defaultValue === "cat"}
          />
          <label
            htmlFor={`${name}-cat`}
            className="ml-8 rounded-full border-2 border-orange-300 bg-white px-4 py-2 text-lg font-semibold hover:cursor-pointer hover:bg-orange-300 hover:font-bold hover:text-white peer-checked:border-orange-300 peer-checked:bg-orange-300 peer-checked:text-white"
          >
            고양이
          </label>
        </div>
        <div>
          <input
            id={`${name}-none`}
            type="radio"
            name={name}
            value="none"
            className="peer sr-only"
            defaultChecked={defaultValue === "none"}
          />
          <label
            htmlFor={`${name}-none`}
            className="ml-8 rounded-full border-2 border-orange-300 bg-white px-4 py-2 text-lg font-semibold hover:cursor-pointer hover:bg-orange-300 hover:font-bold hover:text-white peer-checked:border-orange-300 peer-checked:bg-orange-300 peer-checked:text-white"
          >
            없음
          </label>
        </div>
      </div>
    </fieldset>
  );
}
