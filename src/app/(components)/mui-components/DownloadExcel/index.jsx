import React from "react";
import { Button, Typography, Grid } from "@mui/material";
import Papa from "papaparse";
import { FaRegFileExcel } from "react-icons/fa";

export const CustomDownloadExcel = ({ handleDownloadCSV, ...props }) => {
  // const handleDownloadCSV = () => {
  //   if (props?.rows != 0 ) {
  //     const csv = Papa.unparse(props.rows);
  //     const blob = new Blob([csv], { type: 'text/csv' });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.style.display = 'none';
  //     a.href = url;
  //     a.download = props.data;
  //     document.body.appendChild(a);
  //     a.click();
  //     URL.revokeObjectURL(url);
  //     document.body.removeChild(a);
  //   } else {
  //     alert('Unable to download: No data available');
  //   }
  // };
  return (
    <>
      {
        <Button
          variant="outlined"
          sx={{ mr: 1 }}
          {...props}
          onClick={handleDownloadCSV}
          startIcon={<FaRegFileExcel />}
          size="large"
        >
          {props.name}
        </Button>
      }
    </>
  );
};
