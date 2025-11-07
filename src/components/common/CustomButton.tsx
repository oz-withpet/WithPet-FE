"use client";

import { Button } from "@mui/material";

interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
}

export default function CustomButton({
  label,
  onClick,
  isActive = false,
  disabled = false,
}: CustomButtonProps) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      className="normal-case"
      sx={{
        height: 44,
        borderRadius: "4px",
        fontWeight: 500,
        transition: "all 0.2s ease",
        boxShadow: "none",
        backgroundColor: disabled
          ? "#F6F6F9" // gray-200
          : isActive
            ? "#FF9806" // line-strong
            : "#E4E4E6", // gray-300
        color: disabled ? "#A6A6A6" : isActive ? "#FFFFFF" : "#000000",
        "&:hover": {
          backgroundColor: disabled ? "#F6F6F9" : isActive ? "#FF9806" : "#FFCE88", // hover:bg-line-light
          color: disabled ? "#A6A6A6" : isActive ? "#fff" : "#1a1a1a",
          boxShadow: "none",
        },
        "&:active": {
          transform: "scale(0.97)",
        },
      }}
    >
      {label}
    </Button>
  );
}
