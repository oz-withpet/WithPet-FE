"use client";

export type Gender = "male" | "female";

/** 공용 성별 라디오 그룹 */
export function GenderField({
  name = "gender",
  defaultValue = "male",
  required = true,
}: {
  name?: string;
  defaultValue?: Gender;
  required?: boolean;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="sr-only">성별</legend>

      <div className="flex gap-2">
        {/* 남자 */}
        <div>
          <input
            id={`${name}-male`}
            type="radio"
            name={name}
            value="male"
            className="peer sr-only"
            defaultChecked={defaultValue === "male"}
            // 라디오 그룹은 하나만 required면 그룹 전체가 필수 처리됨
            required={required}
          />
          <label
            htmlFor={`${name}-male`}
            className="rounded-full border-2 border-orange-300 bg-white px-4 py-2 text-lg font-semibold hover:cursor-pointer hover:bg-orange-300 hover:font-bold hover:text-white peer-checked:border-orange-300 peer-checked:bg-orange-300 peer-checked:text-white"
          >
            남자
          </label>
        </div>

        {/* 여자 */}
        <div>
          <input
            id={`${name}-female`}
            type="radio"
            name={name}
            value="female"
            className="peer sr-only"
            defaultChecked={defaultValue === "female"}
          />
          <label
            htmlFor={`${name}-female`}
            className="ml-12 rounded-full border-2 border-orange-300 bg-white px-4 py-2 text-lg font-semibold hover:cursor-pointer hover:bg-orange-300 hover:font-bold hover:text-white peer-checked:border-orange-300 peer-checked:bg-orange-300 peer-checked:text-white"
          >
            여자
          </label>
        </div>
      </div>
    </fieldset>
  );
}

/** 사용 예시: 폼 + 제출 */
