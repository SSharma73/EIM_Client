"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CommonDialog from "@/app/(components)/mui-components/Dialog/common-dialog";
import {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar/index";
import axiosInstanceImg from "@/app/api/axiosInstanceImg";
const UploadFile = ({
  openUpload,
  getDeviceData,
  setOpenUpload,
}) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [version, setVersion] = useState("");
  const handleCloseUpload = () => {
    setOpenUpload(false);
    setFile(null);
    setVersion("");
  };
  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setProgress(0);
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 10485760,
  });
  const upLoadFile = async () => {
    if (!file) {
      notifyError("No file selected");
      return;
    }
    if (!version) {
      notifyError("Version is required");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("version", version);
    try {
      const response = await axiosInstanceImg.post(
        "api/firmware-version/add-firmware",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            }
          },
        }
      );
      if (response?.status === 200 || response?.status === 201) {
        notifySuccess("File uploaded successfully");
        getDeviceData();
        handleCloseUpload();
      } else {
        notifyError("Failed to upload file");
      }
    } catch (error) {
      notifyError("Error uploading file");
    }
  }
  return (
    <CommonDialog
      open={openUpload}
      maxWidth={"sm"}
      fullWidth={true}
      title="Upload files"
      message={"Are you sure you want to cancel?"}
      titleConfirm={"Cancel"}
      onClose={handleCloseUpload}
    >
      <DialogContent>
        <Box
          sx={{
            border: "2px dashed #e0e0e0",
            borderRadius: "8px",
            padding: "16px",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          {" "}
          <TextField
            label="Version"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            placeholder="Enter version"
            sx={{ marginBottom: "16px" }}
          />
          <Typography variant="h6" sx={{ marginBottom: "16px" }}>
            Upload files
          </Typography>
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              padding: "32px",
              cursor: "pointer",
              marginBottom: "16px",
            }}
          >
            <input {...getInputProps()} />
            <CloudUploadIcon sx={{ fontSize: 48, color: "#90caf9" }} />
            <Typography>Choose a file or drag & drop it here</Typography>
            <Typography variant="body2">(Any file type, up to 10MB)</Typography>
          </Box>
          {file && (
            <Box sx={{ marginBottom: "16px" }}>
              <InsertDriveFileIcon sx={{ fontSize: 48, color: "#4caf50" }} />
              <Typography>{file?.name}</Typography>
              <Typography variant="body2">{`${(file?.size / 1024).toFixed(
                2
              )} KB`}</Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ marginTop: "8px" }}
              />
              <Typography variant="body2" sx={{ marginTop: "8px" }}>
                {progress?.toFixed(2)}% uploaded
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseUpload} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button
          onClick={upLoadFile}
          color="primary"
          variant="contained"
          disabled={!file}
        >
          Submit
        </Button>
      </DialogActions>
    </CommonDialog>
  );
};
export default UploadFile;