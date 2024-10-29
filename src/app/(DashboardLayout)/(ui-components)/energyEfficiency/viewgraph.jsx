import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Typography,
  Grid,
  TextField,
  Divider,
  IconButton,
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
        <DialogContent
          sx={{
            background:
              "linear-gradient(112.37deg, #589CFF 0%, #013376 116.12%)",
          }}
        >
          <Grid container rowGap={3}>
            <Grid container direction={"column"} rowGap={2}>
              <Grid
                container
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "700",
                  }}
                  color="primary"
                >
                  Live CS/SS Load
                </Typography>
                <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
                  <CloseOutlinedIcon />
                </IconButton>
              </Grid>
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
