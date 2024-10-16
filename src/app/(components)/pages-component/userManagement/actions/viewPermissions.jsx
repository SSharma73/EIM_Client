import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  IconButton,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useForm } from "react-hook-form";

export default function AddUser({ rows, open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const modules = [
    { _id: "1", name: "fleet-management" },
    { _id: "2", name: "cs/ss-management" },
    { _id: "3", name: "cs/ss-efficiency" },
    { _id: "4", name: "battery-analysis" },
    { _id: "5", name: "customer-management" },
    { _id: "6", name: "eim-subscriptions" },
  ];

  return (
    <React.Fragment>
      <Dialog open={open} maxWidth={"sm"} onClose={handleClose} fullWidth>
        <DialogTitle>
          <Grid container justifyContent="space-between" alignItems={"center"}>
            <Typography variant="h5">Access permission</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseOutlinedIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid item>
            <TextField
              fullWidth
              value={rows?.role?.roleName ?? rows?.roleName}
              disabled
            />
          </Grid>
          <Grid item mt={4} ml={2}>
            <Grid container spacing={2}>
              {modules?.map((item) => (
                <Grid item xs={6} key={item._id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={true}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label={item.name}
                    sx={{ marginRight: 2, textTransform: "capitalize" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
