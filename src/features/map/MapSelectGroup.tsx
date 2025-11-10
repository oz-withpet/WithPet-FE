import { useMemo, useState } from "react";

import Select from "@/components/common/select/Select";
import { useLocations } from "@/shared/hooks/useLocations";

export default function MapSelectGroup() {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const { data: provinceResponse } = useLocations();
  const { data: districtResponse, isLoading: isDistrictLoading } = useLocations(
    province ? { province } : undefined,
    { enabled: Boolean(province) },
  );
  const { data: neighborhoodResponse, isLoading: isNeighborhoodLoading } = useLocations(
    province && district ? { province, district } : undefined,
    { enabled: Boolean(province && district) },
  );

  const provinceOptions = useMemo(
    () => provinceResponse?.data.map((item) => ({ label: item.name, value: item.id })) ?? [],
    [provinceResponse],
  );

  const districtOptions = useMemo(
    () => (province ? districtResponse?.data.map((item) => ({ label: item.name, value: item.id })) ?? [] : []),
    [districtResponse, province],
  );

  const neighborhoodOptions = useMemo(
    () =>
      province && district
        ? neighborhoodResponse?.data.map((item) => ({ label: item.name, value: item.id })) ?? []
        : [],
    [neighborhoodResponse, province, district],
  );

  const handleProvinceChange = (value: string) => {
    setProvince(value);
    setDistrict("");
    setNeighborhood("");
  };

  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setNeighborhood("");
  };

  const isDistrictDisabled = !province || isDistrictLoading || districtOptions.length === 0;
  const isNeighborhoodDisabled =
    !province || !district || isNeighborhoodLoading || neighborhoodOptions.length === 0;

  return (
    <div className="relative mb-4 flex gap-2">
      <Select
        value={province}
        onChange={handleProvinceChange}
        options={provinceOptions}
        placeholder="시도"
        status="primary"
      />
      <Select
        value={district}
        onChange={handleDistrictChange}
        options={districtOptions}
        placeholder="시군구"
        disabled={isDistrictDisabled}
        status="primary"
      />
      <Select
        value={neighborhood}
        onChange={setNeighborhood}
        options={neighborhoodOptions}
        placeholder="읍면동"
        disabled={isNeighborhoodDisabled}
        status="primary"
      />
    </div>
  );
}
