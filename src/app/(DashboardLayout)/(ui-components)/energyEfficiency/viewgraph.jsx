import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Typography,
  Grid,
  TextField,
  Divider,
  IconButton,
  DialogTitle,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Graph from "./graph";
import Graph2 from "./graph2";

export default function AlertDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Dialog open={open} maxWidth={"sm"} fullWidth onClose={handleClose}>
        <DialogTitle>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h5">Live CS/SS Load</Typography>
            <IconButton onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container rowGap={3} mt={2}>
            <Grid container direction={"column"} rowGap={2}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    color="primary"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    Live charging power
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                    }}
                    color={"#fff"}
                  >
                    -- kW
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    color="primary"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    Utilization
                  </Typography>
                  <Typography
                    color={"#fff"}
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    --
                  </Typography>
                </Grid>
              </Grid>

              <Graph />
            </Grid>
            <Grid container direction={"column"} rowGap={2}>
              <Typography
                variant="h4"
                color="primary"
                sx={{ fontWeight: "700" }}
              >
                Session
              </Typography>
              <Typography
                color="primary"
                sx={{ fontSize: "12px", fontWeight: "700" }}
              >
                Active Session 0
              </Typography>
              <Graph2 />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
