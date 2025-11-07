import { useState } from "react";

import CustomButton from "../common/CustomButton";

const categories = ["병원", "카페", "미용실", "호텔"];

export default function MapButtonGroup() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {categories.map((label) => (
        <CustomButton
          key={label}
          label={label}
          isActive={active === label}
          onClick={() => setActive(label)}
        />
      ))}
    </div>
  );
}
