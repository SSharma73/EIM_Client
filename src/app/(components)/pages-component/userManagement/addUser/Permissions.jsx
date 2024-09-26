import React from "react";
import {
  Grid,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";

const Permission = ({
  modules,
  customizeModule,
  handleChangeModule,
  error,
}) => {
  return (
    <div>
      <Grid container spacing={2}>
        {modules?.map((item) => (
          <Grid item xs={6} key={item._id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={customizeModule.includes(item.name)}
                  onChange={(e) => handleChangeModule(e, item)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={item.name}
              sx={{ marginRight: 2, textTransform: "capitalize" }}
            />
          </Grid>
        ))}
      </Grid>
      {error && <FormHelperText error>{error.message}</FormHelperText>}
    </div>
  );
};

export default Permission;
