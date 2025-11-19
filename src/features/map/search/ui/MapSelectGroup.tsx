"use client";

import { useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";

import Select from "@/components/common/select/Select";
import type { AppDispatch, RootState } from "@/shared/store";
import { setSelectedLocation } from "@/shared/store/mapSlice";
import type { DistrictResponse, NeighborhoodResponse, ProvinceResponse } from "@/types/mapTypes";

import { useLocations } from "../api/useLocations";

export default function MapSelectGroup() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedLocation = useSelector((state: RootState) => state.map.selectedLocation);
  const province = selectedLocation.province_code ?? "";
  const district = selectedLocation.district_code ?? "";
  const neighborhood = selectedLocation.neighborhood_code ?? "";

  const { data: provinceResponse } = useLocations();
  const { data: districtResponse, isLoading: isDistrictLoading } = useLocations(
    province ? { province } : undefined,
    { enabled: Boolean(province) },
  );
  const { data: neighborhoodResponse, isLoading: isNeighborhoodLoading } = useLocations(
    province && district ? { province, district } : undefined,
    { enabled: Boolean(province && district) },
  );

  const provinces = provinceResponse as ProvinceResponse | undefined;
  const districts = districtResponse as DistrictResponse | undefined;
  const neighborhoods = neighborhoodResponse as NeighborhoodResponse | undefined;

  const provinceOptions = useMemo(
    () =>
      provinces?.map((item) => ({
        label: item.province_name,
        value: String(item.province_code),
      })) ?? [],
    [provinces],
  );

  const districtOptions = useMemo(
    () =>
      province
        ? (districts?.map((item) => ({
            label: item.district_name,
            value: String(item.district_code),
          })) ?? [])
        : [],
    [districts, province],
  );

  const neighborhoodOptions = useMemo(
    () =>
      province && district
        ? [
            { label: "전체", value: "__all__" },
            ...(neighborhoods?.map((item) => ({
              label: item.neighborhood_name,
              value: String(item.neighborhood_code),
            })) ?? []),
          ]
        : [],
    [neighborhoods, province, district],
  );

  const handleProvinceChange = (value: string) => {
    dispatch(
      setSelectedLocation({ province_code: value, district_code: "", neighborhood_code: "" }),
    );
  };

  const handleDistrictChange = (value: string) => {
    dispatch(setSelectedLocation({ district_code: value, neighborhood_code: "" }));
  };

  const handleNeighborhoodChange = (value: string) => {
    if (value === "__all__") {
      dispatch(setSelectedLocation({ neighborhood_code: "" }));
      return;
    }
    dispatch(setSelectedLocation({ neighborhood_code: value }));
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
