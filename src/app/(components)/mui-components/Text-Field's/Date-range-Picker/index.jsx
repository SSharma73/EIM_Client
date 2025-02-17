"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { addDays, subDays } from "date-fns";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(),
  },
}));

const defaultDateRange = {
  startDate: subDays(new Date(), 7),
  endDate: addDays(new Date(), 0),
  key: "selection",
};

const Calendar = ({ getDataFromChildHandler }) => {
  const [open, setOpen] = useState(false);
  const [fullWidth] = useState(true);
  const [maxWidth] = useState("md");
  const [state, setState] = useState([defaultDateRange]);
  const [selectedRange, setSelectedRange] = useState([defaultDateRange]);
  const [inputValue, setInputValue] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    setSelectedRange(state);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    setState(selectedRange);
    setInputValue(
      `${dayjs(selectedRange?.[0].startDate).format("DD/MM/YYYY")} - ${dayjs(
        selectedRange?.[0].endDate
      ).format("DD/MM/YYYY")}`
    );
    setOpen(false);
  };

  const handleOnChange = (ranges) => {
    const selection = ranges.selection;
    setSelectedRange([selection]);
  };

  function getDates(startDate, endDate) {
    const dates = [];
    const current = new Date(startDate);
    const end = new Date(endDate);

    while (current <= end) {
      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, "0");
      const day = String(current.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;
      dates.push(dateString);
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }

  useEffect(() => {
    const dates = getDates(state?.[0].startDate, state?.[0].endDate);
    let resultArray;

    if (dates.length === 1) {
      resultArray = Array.from({ length: 24 }, (_, i) => i);
    } else if (dates.length > 31) {
      resultArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    } else {
      resultArray = dates;
    }

    getDataFromChildHandler(state, resultArray);
  }, [state]);

  const isFutureDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  };
  useEffect(() => {
    if (selectedRange.length > 0) {
      setInputValue(
        `${dayjs(selectedRange[0].startDate).format("DD/MM/YYYY")} - ${dayjs(
          selectedRange[0].endDate
        ).format("DD/MM/YYYY")}`
      );
    }
  }, [selectedRange]);

  return (
    <>
      <input
        onClick={handleClickOpen}
        value={inputValue || "dd/mm/yyyy - dd/mm/yyyy"}
        style={{
          borderRadius: "4px",
          padding: "9px 10px",
          width: "216px",
          height: "43px",
          fontWeight: "bold",
          fontSize: "14px",
          background:
            "linear-gradient(111.41deg, rgba(255, 255, 255, 0.272) 0%, rgba(255, 255, 255, 0.068) 100%)",
          backgroundColor: "transparent",
          border: "1px solid #ddd",
          cursor: "pointer",
        }}
      />

      <BootstrapDialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        PaperProps={{
          className: "SmallDialog",
        }}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <DialogContent
          sx={{
            backgroundColor: "#fff",
            m: 0,
            p: 1,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DateRangePicker
            onChange={handleOnChange}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={selectedRange}
            direction="horizontal"
            disabledDay={(date) => isFutureDate(date)}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#fff", p: 0 }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "primary.main",
              minWidth: "120px",
              color: "primary.main",
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: "transparent",
              },
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ minWidth: "120px" }}
            onClick={handleApply}
          >
            Apply
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

Calendar.propTypes = {
  getDataFromChildHandler: PropTypes.func.isRequired,
};

export default Calendar;
