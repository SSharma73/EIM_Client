"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Chip } from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { FaRegFileExcel } from "react-icons/fa";
import axiosInstance from "@/app/api/axiosInstance";
import { notifyError, notifySuccess } from "../../mui-components/Snackbar";

const Charging = ({ value, eventLabel, selectedItems, selectedCustId }) => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const labelStatus = eventLabel?.slice(0, 8);
  const columns = [
    "E-Tractor ID",
    `${labelStatus} cycle`,
    `${labelStatus} time(hr.)`,
    "Status",
    "Start SoC(%)",
    "End SoC(%)",
    "Current SoC(%)",
    "Charged SoC(%)",
    "Units consumed (kWh)",
    // "Action",
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(debouncedSearchQuery);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearchQuery]);

  const handleSearchChange = (event) => {
    setDebouncedSearchQuery(event.target.value);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleConfirm = () => {
    handleCancel();
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const handleExport = (formattedData) => {
    if (!Array.isArray(formattedData) || formattedData.length === 0) {
      notifyError("No data available to export");
      return;
    }

    const csvData = [];
    const tableHeading = "All CS Etractor Data";
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);

    const headerRow = [
      "E-Tractor ID",
      `${labelStatus} cycle`,
      "Charging time",
      "Start SoC(%)",
      "End SoC(%)",
      "Current SoC(%)",
      "Charged SoC(%)",
      "Units consumed",
    ];
    csvData.push(headerRow);

    formattedData.forEach((row) => {
      const rowData = [
        row?.["E-Tractor ID"] || "--",
        row?.["Charging Cycle"] || "--",
        row?.["Charging Time (hr.)"] || "--",
        row?.Status || "--",
        row?.["Start SoC (%)"] || "--",
        row?.["End SoC (%)"] || "--",
        // Extract the text from the Chip component for "Current SoC (%)"
        row?.["Current SoC (%)"]?.props?.label || "--",
        row?.["Charged SoC (%)"] || "--",
        row?.["Units Consumed (kWh)"] || "--",
      ];
      csvData.push(rowData);
    });

    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "CS-EtractorData.csv");
    notifySuccess("Download Excel Successfully");
  };
  // Fetch fleet data on component mount
  const fetchFleets = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        customerId: selectedCustId,
        region: selectedItems?.Region,
        type: labelStatus === "Swapping" ? "sany" : "delta",
      });
      const { data } = await axiosInstance.get(
        `fleet/fetchFleets?${params.toString()}`
      );
      setData(data.data);
    } catch (error) {
      notifyError(error?.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFleets();
  }, [selectedCustId, selectedItems?.Region, labelStatus]);
  const getFormattedData = (data) => {
    return data?.map((item, index) => ({
      "E-Tractor ID": item?.fleetNumber || "--",
      "Charging Cycle":
        labelStatus === "Swapping"
          ? item?.swappingCycle || "--"
          : item?.chargingCycle || "--",
      "Charging Time (hr.)":
        labelStatus === "Swapping"
          ? item?.fleetSwappingTime
            ? item?.fleetSwappingTime.toFixed(2)
            : "" || "--"
          : item?.chargingTime || "--",
      Status: item?.status || "--",
      "Start SoC (%)":
        labelStatus === "Swapping"
          ? item?.startSoc || "--"
          : item?.startSoC || "--",
      "End SoC (%)":
        labelStatus === "Swapping"
          ? item?.endSoc || "--"
          : item?.endSoc || "--",
      "Current SoC (%)": (
        <Chip
          key={index}
          color="primary"
          sx={{ width: "80px" }}
          label={item?.batteryPercentage || "--"}
        />
      ),
      "Charged SoC (%)": item?.chargedSoC || "--",
      "Units Consumed (kWh)": item?.unitsConsumed || "--",
      // Action: [
      //   <Grid container justifyContent="center" spacing={2} key={index}>
      //     <Grid item xs={12}>
      //       <Tooltip title="View">
      //         <Link
      //           href={`/csManagement/${item._id}?tab=${value}&eventLabel=${eventLabel}`}
      //         >
      //           <IconButton size="small">
      //             <IoEyeOutline color="rgba(14, 1, 71, 1)" />
      //           </IconButton>
      //         </Link>
      //       </Tooltip>
      //     </Grid>
      //   </Grid>,
      // ],
    }));
  };

  return (
    <Grid container>
      <Grid container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          p={2}
          className="customGrid"
        >
          <Grid item>
            <Typography variant="h3">E-Tractor</Typography>
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
            columns={columns}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Charging;
