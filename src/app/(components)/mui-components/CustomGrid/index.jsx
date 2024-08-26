import React from "react";
import { Grid } from "@mui/material";

export const CustomGrid = ({ children, height }) => {
  return (
    <Grid
      container
      sx={{
        padding: "16px",
        backgroundColor: "#6099EB",
        borderRadius: "16px",
        color: "#fff",
      }}
      height={height}
    >
      {children}
    </Grid>
  );
};
