import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Typography,
  Grid,
  TextField,
  Divider,
  IconButton,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { LiaCoinsSolid } from "react-icons/lia";
import { FaRegMoneyBillAlt } from "react-icons/fa";

export default function AlertDialog({ open, setOpen, fusionValue }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Dialog open={open} maxWidth={"sm"} fullWidth onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: "#161861", padding: " 8px 8px" }}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h4" sx={{ color: "#C0FE72" }}>
              {fusionValue}{" "}
            </Typography>
            <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
              <CloseOutlinedIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#639BEB" }}>
          <Grid container rowGap={5} mt={2} mb={3}>
            <Grid container alignItems={"center"}>
              <FaRegMoneyBillAlt color="#fff" size={"22px"} />{" "}
              <Typography ml={2} variant="h5" color={"#fff"}>
                {" "}
                Fix Price{" "}
                <span style={{ color: "#161861", fontWeight: 700 }}>
                  $99,000
                </span>{" "}
                for{" "}
                <span style={{ color: "#161861", fontWeight: 700 }}>
                  4800 kWh
                </span>
              </Typography>
            </Grid>
            <Grid container alignItems={"center"}>
              <LiaCoinsSolid color="#fff" size={"25px"} />{" "}
              <Typography ml={2} variant="h5" color={"#fff"}>
                {" "}
                <span style={{ color: "#161861", fontWeight: 700 }}>
                  Above 4800 kWh,
                </span>
                Pay As You Charge
                <br />
                <span style={{ color: "#161861", fontWeight: 700 }}>
                  {" "}
                  @ $ 15/kWh
                </span>
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container justifyContent={"flex-end"} mt={1}>
            <Typography sx={{ color: "#fff" }}>Month/year</Typography>
          </Grid>
          {fusionValue && fusionValue == "fusion B" && (
            <Grid
              container
              sx={{
                backgroundColor: "#FFFFFF",
                p: 2,
                borderRadius: "16px",
                color: "#000",
              }}
              mt={1}
              rowGap={1}
            >
              <Grid
                container
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography sx={{ color: "#FF4848" }} variant="h5">
                  Your Plan Will Expire Soon
                </Typography>
                <Typography sx={{ color: "#161861" }} variant="h6">
                  Expire Date - 6/12/2024
                </Typography>
              </Grid>
              <Grid container>
                Reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
