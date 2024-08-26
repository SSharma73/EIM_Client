"use client";
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Table from "./table";

export default function DistanceTravel({ setOpen, open, data1, data }) {
  const [age, setAge] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [deviceData, setDeviceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState(null);
  const [progress, setProgress] = React.useState(0);
  const getDataFromChildHandler = (date, dataArr) => {
    setDate(date);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog open={open} maxWidth={"md"} onClose={handleClose} fullWidth>
        <DialogContent sx={{ padding: 0 }}>
          <Table
            data1={data1}
            data={data}
            handleClose={handleClose}
            deviceData={deviceData}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            page={page}
            setPage={setPage}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            loading={loading}
            getDataFromChildHandler={getDataFromChildHandler}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
