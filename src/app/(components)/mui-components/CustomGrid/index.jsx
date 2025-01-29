import React from "react";
import { Grid } from "@mui/material";

export const CustomGrid = ({ children, height }) => {
  return (
    <Grid container className="customGridOverview" sx={{}} height={height}>
      {children}
    </Grid>
  );
};
