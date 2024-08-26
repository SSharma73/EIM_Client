import * as React from "react";
import { Grid, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AutoBox from "@/app/(DashboardLayout)/(ui-components)/userManagement/autocomplete";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Assign = ({ value, label, data }) => {
  return (
    <Grid container justifyContent={"space-between"} md={12} sm={12} xs={12}>
      {data &&
        // (value && value === 1 ? (
        //   <Grid container sx={{ color: "#FFF" }}>
        //     <Grid item xs={4}>
        //       <Grid
        //         container
        //         justifyContent={"center"}
        //         rowGap={2}
        //         direction={"column"}
        //         alignItems={"center"}
        //       >
        //         <Typography variant="h6" color={"secondary"}>
        //           Region
        //         </Typography>
        //         <Typography variant="body1">Region</Typography>
        //       </Grid>
        //     </Grid>
        //     <Grid item xs={4}>
        //       <Grid container justifyContent={"center"}>
        //         <Typography variant="h6" color={"secondary"}>
        //           Customer
        //         </Typography>
        //       </Grid>
        //     </Grid>
        //     <Grid item xs={4}>
        //       <Grid container justifyContent={"center"}>
        //         <Typography variant="h6" color={"secondary"}>
        //           Fleet
        //         </Typography>
        //       </Grid>
        //     </Grid>
        //   </Grid>
        // ) : (
          <Grid container sx={{ color: "#FFF" }}>
            <Grid item xs={4}>
              <Grid
                container
                justifyContent={"center"}
                rowGap={2}
                direction={"column"}
                alignItems={"center"}
              >
                <Typography variant="h6" color={"secondary"}>
                  {label}
                </Typography>
                {data.map((item, itemIndex) =>
                  item.subModules?.map((subItem, subItemIndex) => (
                    <Typography
                      key={`${itemIndex}-${subItemIndex}`}
                      variant="body1"
                    >
                      {subItem.name}
                    </Typography>
                  ))
                )}
              </Grid>
            </Grid>
          </Grid>
        }
    </Grid>
  );
};
export default Assign;
