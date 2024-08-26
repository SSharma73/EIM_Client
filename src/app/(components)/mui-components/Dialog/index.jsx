import React from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import { IoIosCloseCircleOutline } from "@/app/(components)/mui-components/icons";


const CommonDialog = ({
  title = "Dialog Title",
  message = "Dialog Message",
  color = "primary",
  messageSize = "medium",
  onClose,
  onConfirm,
  icon = true,
  ...otherProps
}) => {
  return (
    <Dialog onClose={onClose} {...otherProps}>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      >
        <IoIosCloseCircleOutline color="white" />
      </IconButton>
      <DialogTitle
        sx={{
          backgroundColor: "#0E0147",
        }}
      >
        <Typography variant="h6" color={"white"} >
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography color="textPrimary" mt={2}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        {onConfirm && (
          <Button onClick={onConfirm} color={color} variant="outlined">
            Confirm
          </Button>
        )}
        {onClose && (
          <Button onClick={onClose} color="inherit" variant="outlined">
            Cancel
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CommonDialog;
