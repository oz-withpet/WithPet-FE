"use client";

import { useMemo, useState } from "react";

import { useDispatch } from "react-redux";

import Select from "@/components/common/select/Select";
import type { AppDispatch } from "@/shared/store";
import { setSelectedLocation } from "@/shared/store/mapSlice";

import { useLocations } from "../api/useLocations";

/**
 * 시도 → 시군구 → 읍면동을 순차적으로 선택하는 컴포넌트입니다.
 *
 * - React Query로 지역 데이터를 가져오고
 * - 각 선택값을 Redux `mapSlice.selectedLocation`에 저장합니다.
 */
export default function MapSelectGroup() {
  const dispatch = useDispatch<AppDispatch>();
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
    () =>
      province
        ? (districtResponse?.data.map((item) => ({ label: item.name, value: item.id })) ?? [])
        : [],
    [districtResponse, province],
  );

  const neighborhoodOptions = useMemo(
    () =>
      province && district
        ? (neighborhoodResponse?.data.map((item) => ({ label: item.name, value: item.id })) ?? [])
        : [],
    [neighborhoodResponse, province, district],
  );

  const handleProvinceChange = (value: string) => {
    setProvince(value);
    setDistrict("");
    setNeighborhood("");
    dispatch(setSelectedLocation({ province: value, district: "", neighborhood: "" }));
  };

  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setNeighborhood("");
    dispatch(setSelectedLocation({ district: value, neighborhood: "" }));
  };

  const handleNeighborhoodChange = (value: string) => {
    setNeighborhood(value);
    dispatch(setSelectedLocation({ neighborhood: value }));
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
        onChange={handleNeighborhoodChange}
        options={neighborhoodOptions}
        placeholder="읍면동"
        disabled={isNeighborhoodDisabled}
        status="primary"
      />
    </div>
  );
}
