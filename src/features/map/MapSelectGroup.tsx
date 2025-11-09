import { useState } from "react";

import Select from "@/components/common/select/Select";

export default function MapSelectGroup() {
  const [province, setProvince] = useState("");
  const provinces = [
    { label: "서울특별시", value: "11" },
    { label: "경기도", value: "41" },
    { label: "부산광역시", value: "26" },
  ];

  return (
    <div className="relative mb-4 flex gap-2">
      <Select
        value={province}
        onChange={setProvince}
        options={provinces}
        placeholder="시도"
        status="primary"
      />
      <Select
        value={province}
        onChange={setProvince}
        options={provinces}
        placeholder="시군구"
        // disabled
        status="default"
      />
      <Select
        value={province}
        onChange={setProvince}
        options={provinces}
        placeholder="읍면동"
        disabled
        status="primary"
      />
    </div>
  );
}
