import { useState } from "react";

import { FormControl, MenuItem, Select } from "@mui/material";

export default function MapSelectGroup() {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  return (
    <div className="relative flex gap-2">
      <FormControl fullWidth size="small">
        <Select
          className="relative rounded bg-gray-200 hover:bg-gray-100"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          displayEmpty
          MenuProps={{
            disablePortal: true,
          }}
          sx={{
            "& .MuiSelect-select": {
              borderRadius: "0.5rem",
              transition: "background-color 0.2s",
              "&:hover": {
                backgroundColor: "#E4E4E6",
              },
            },
            "&.Mui-focused .MuiSelect-select": {
              backgroundColor: "#ffce88",
            },
            "& fieldset": {
              border: "none",
            },
          }}
        >
          <MenuItem value="">
            <span className="text-gray-400">시도 선택</span>
          </MenuItem>
          <MenuItem value="11">서울특별시</MenuItem>
          <MenuItem value="41">경기도</MenuItem>
          <MenuItem value="26">부산광역시</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <Select
          className="rounded bg-gray-200 hover:bg-gray-100"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          MenuProps={{
            disablePortal: true,
          }}
        >
          <MenuItem value="">
            <span className="text-gray-400">시군구 선택</span>
          </MenuItem>
          <MenuItem value="11680">강남구</MenuItem>
          <MenuItem value="11650">서초구</MenuItem>
          <MenuItem value="11110">종로구</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <Select
          className="rounded bg-gray-200 hover:bg-gray-100"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          MenuProps={{
            disablePortal: true,
          }}
        >
          <MenuItem value="">
            <span className="text-gray-400">읍면동 선택</span>
          </MenuItem>
          <MenuItem value="1168010100">역삼동</MenuItem>
          <MenuItem value="1168010200">논현동</MenuItem>
          <MenuItem value="1168010300">삼성동</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
