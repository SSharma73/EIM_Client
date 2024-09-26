"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Button, Chip } from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { FaRegFileExcel } from "react-icons/fa";
import ToastComponent, {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar";
import { useRouter } from "next/navigation";

const Table = ({
  type,
  data,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  searchQuery,
  setSearchQuery,
  loading,
}) => {
  const columns = [
    "Brand logo",
    "Brand name ",
    "Customer name",
    "Email",
    "Phone",
    "Address",
    "City",
    "State",
    "Pincode",
    "Country",
    "Subscription",
  ];
  const columns2 = ["Port name", "Port address", "Customer", "Tariff"];

  const [open, setOpenDialog] = React.useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(debouncedSearchQuery);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearchQuery, setSearchQuery]);

  const handleSearchChange = (event) => {
    setDebouncedSearchQuery(event.target.value);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleExport = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      notifyError("No data available to export");
      return;
    }

    const modifiedData = data?.map((row) => ({
      portId: row?.portId,
      name: row?.name,
      regionName: row?.regionName,
      customer: row?.customer?.userName,
      tariff: row?.tariff?.name,
    }));

    const csvData = [];
    const tableHeading = "All Customer Management Data";
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);

    const headerRow = [
      "Port ID",
      "Port name ",
      "Port location",
      "Customer",
      "Tariff",
    ];
    csvData.push(headerRow);

    modifiedData.forEach((row) => {
      const rowData = [
        row?.portId,
        row?.name,
        row?.regionName,
        row?.customer,
        row?.tariff,
      ];
      csvData.push(rowData);
    });
    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "CustomerMamagementData.csv");
    notifySuccess("Download Excel Successfuly");
  };

  const handleConfirm = () => {
    handleCancel();
  };
  const handleCancel = () => {
    setOpenDialog(false);
  };
  const handleClickTarif = () => {
    router.push("/tariffManagement/createTariff");
  };
  const getFormattedData = (data) => {
    return data?.map((item, index) => {
      // portId: (
      //   <Box>
      //     <span>{item?.portId}</span>
      //     <Box
      //       component="span"
      //       sx={{
      //         display: "inline-block",
      //         width: "10px",
      //         height: "10px",
      //         borderRadius: "50%",
      //         backgroundColor: item.color,
      //         marginLeft: "10px",
      //       }}
      //     />
      //   </Box>
      // ),
      // name: item?.name ?? "--",
      // regionName: item?.regionName ? item?.regionName : "--",
      // customer: item?.customer?.userName ? item?.customer?.userName : "--",
      // tariff: (
      //   <Chip
      //     label={item?.tariff?.name ? item?.tariff?.name : "--"}
      //     color="primary"
      //     onClick={handleClickTarif}
      //   />
      // ),

      const actionComponent = (
        <Grid container justifyContent="center" spacing={2} key={index}>
          <Chip
            label={item?.tariff?.name ? item?.tariff?.name : "--"}
            color="primary"
            onClick={handleClickTarif}
          />
        </Grid>
      );

      if (type === "Customer") {
        return {
          "Brand logo": item?.brandLogo ?? "--",
          "Brand name": item?.brandName ?? "--",
          "Customer name": item?.adminUser?.name ?? "--",
          Email: item?.adminUser?.email ?? "--",

          Phone: item?.adminUser?.phone ?? "--",
          Address: item?.brandAddress?.line1 ?? "--",
          City: item?.brandAddress?.city ?? "--",
          State: item?.brandAddress?.state ?? "--",
          Pincode: item?.brandAddress?.pincode ?? "--",
          Country: item?.brandAddress?.country ?? "--",
          Action: actionComponent,
        };
      }
      return {
        "Port name": item?.name ?? "--",
        "Port address": item?.address?.line1 ?? "--",
        Customer: item?.customerId?.brandName ?? "--",
        Action: actionComponent,
      };
    });
  };

  return (
    <Grid container>
      <ToastComponent />
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        p={2}
        sx={{
          backgroundColor: "#669BE9",
          color: "#fff",
          borderRadius: "16px 16px 0px 0px",
        }}
      >
        <Grid item>
          <Typography variant="h3">
            {type === "Customer" ? "Customer details" : "Port details"}
          </Typography>
        </Grid>
        <Grid item className="customSearch">
          <Grid container>
            <Grid item mr={1}>
              <Button
                variant="outlined"
                sx={{ mr: 1 }}
                onClick={() => {
                  handleExport(data?.data);
                }}
                startIcon={<FaRegFileExcel />}
                size="large"
              >
                Download Excel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {loading ? (
        <TableSkeleton
          rowNumber={new Array(10).fill(0)}
          tableCell={new Array(5).fill("15%")}
          actions={new Array(2).fill(0)}
        />
      ) : (
        <CustomTable
          page={page}
          rows={getFormattedData(data)}
          count={data?.totalDocuments}
          columns={type === "Customer" ? columns : columns2}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      )}
    </Grid>
  );
};

export default Table;
