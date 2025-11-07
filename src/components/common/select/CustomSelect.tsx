"use client";

import { FormControl, MenuItem, Select } from "@mui/material";

interface CustomSelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  value: string;
  options: CustomSelectOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  isActive?: boolean;
}

export default function CustomSelect({
  value,
  options,
  onChange,
  disabled = false,
  placeholder = "선택하세요",
  className = "",
  isActive = false,
}: CustomSelectProps) {
  return (
    <FormControl fullWidth size="small" disabled={disabled}>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
        className={`rounded ${className}`}
        MenuProps={{
          disablePortal: true,
        }}
        sx={{
          "& .MuiSelect-select": {
            borderRadius: "4px",
            transition: "background-color 0.2s",
            backgroundColor: isActive ? "#ffce88" : "#e4e4e6",
            color: disabled ? "#a6a6a6" : "#000000",
            "&:hover": {
              backgroundColor: disabled ? "#e4e4e6" : "#f6f6f9",
            },
          },
          "&.Mui-focused .MuiSelect-select": {
            backgroundColor: "#ffce88",
          },
          "&.Mui-disabled .MuiSelect-select": {
            backgroundColor: "#e4e4e6",
            color: "#a6a6a6",
            pointerEvents: "none",
          },
          "& fieldset": {
            border: "none",
          },
        }}
      >
        <MenuItem value="">
          <span className="text-gray-400">{placeholder}</span>
        </MenuItem>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
