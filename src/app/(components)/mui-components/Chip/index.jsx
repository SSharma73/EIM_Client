import { Chip } from "@mui/material";
import React from "react";

export const ColoredChip = ({ label, variant, size, icon, ...props }) => {
  return (
    <>
      <Chip
       sx={{
        borderRadius: "4px",
        ml: 1,
        backgroundColor: "#23262966",
        color: "#C0FE72",
        border: "0.6px solid #232629",
      }}
        size={size}
        variant={variant}
        icon={icon}
        label={label}
        {...props}
      />
    </>
  );
};
export const TransparentChip = ({ label, variant, size, icon, ...props }) => {
  return (
    <>
      <Chip
        sx={{
          borderRadius: "4px",
          border: "0.6px solid #255182",
          ml: 1,
          backgroundColor: "rgba(30, 69, 106, 0.26)",
          color: "#fff",
        }}
        size={size}
        variant={variant}
        icon={icon}
        label={label}
        {...props}
      />
    </>
  );
};

