"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Avatar,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import Papa from "papaparse";
import { IoEyeOutline } from "react-icons/io5";
import { saveAs } from "file-saver";
import { FaRegFileExcel } from "react-icons/fa";
import ToastComponent, {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar";
import { useRouter } from "next/navigation";
import TariffPlan from "./viewTariffPlan";

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

  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [id, setId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(debouncedSearchQuery);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearchQuery, setSearchQuery]);

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleExport = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      notifyError("No data available to export");
      return;
    }

    const csvData = [];
    const tableHeading = "All Customer Management Data";
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);

    const headerRow = type === "Customer" ? columns : columns2;

    csvData.push(headerRow);

    data.forEach((item) => {
      const rowData =
        type === "Customer"
          ? [
              item?.brandLogo ?? "--",
              item?.brandName ?? "--",
              item?.adminUser?.name ?? "--",
              item?.adminUser?.email ?? "--",
              item?.adminUser?.phone ?? "--",
              item?.brandAddress?.line1 ?? "--",
              item?.brandAddress?.city ?? "--",
              item?.brandAddress?.state ?? "--",
              item?.brandAddress?.pincode ?? "--",
              item?.brandAddress?.country ?? "--",
            ]
          : [
              item?.name ?? "--",
              item?.address?.line1 ?? "--",
              item?.customerId?.brandName ?? "--",
              item?.tariff?.name ?? "--",
            ];
      csvData.push(rowData);
    });

    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "CustomerManagementData.csv");
    notifySuccess("Download Excel Successfully");
  };

  const getFormattedData = (data) => {
    return data?.map((item, index) => {
      const actionComponent = (
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
          key={index}
        >
          <Grid item>
            {type === "Customer" ? (
              <Chip label={item?.subscription?.name || "N/A"} color="primary" />
            ) : (
              <IconButton
                size="small"
                key={index}
                onClick={() => {
                  setSelectedRow(item);
                  setOpen(true);
                  setId(item?.tariffId);
                }}
              >
                <IoEyeOutline />
              </IconButton>
            )}{" "}
          </Grid>
        </Grid>
      );

      if (type === "Customer") {
        return {
          "Brand logo": (
            <Avatar
              src={item?.brandLogo}
              alt={item?.brandName || "Brand logo"}
              sx={{ width: 40, height: 40 }}
            />
          ),
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
        className="customGrid"
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
                  handleExport(data?.result);
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
          rows={getFormattedData(data?.result)}
          count={data?.totalDocuments}
          columns={type === "Customer" ? columns : columns2}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      )}
      {open && <TariffPlan id={id} open={open} setOpen={setOpen} />}
    </Grid>
  );
};

export default Table;
