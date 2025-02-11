"use client";
import Table from "./table";
import moment from "moment";
import { Grid } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/api/axiosInstanceImg";
import ManagementGrid from "@/app/(components)/mui-components/Card";

const ChargingId = ({ params }) => {
  const searchParams = useSearchParams();
  const tabValue = searchParams.get("tab");
  const eventLabel = searchParams.get("eventLabel");
  const hubName = searchParams.get("name");
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deviceData, setDeviceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [chargerType, setChargerType] = React.useState("Charging");

  const labelStatus = eventLabel?.slice(0, 8);

  const typeStatus = hubName.split(" ")[0];

  const vehicle1 = [
    "Date & Time",
    "Hub name",
    "Status",
    chargerType === "BatteryCharge" ? "Battery No." : "Truck ID",
    "Unit consumed(kWh)",
    "Avg. charging time(hr.)",
  ];
  const E_tractor = [
    "Date",
    `${labelStatus} cycle`,
    `${labelStatus}  time(hr)`,
    "Start Soc(%)",
    "End SoC(%)",
    "Current SoC(%)",
    "Units consumed(kWh)",
  ];

  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "CS/SS-Management", link: "/csManagement" },
    {
      label: `${hubName}`,
      link: `/csManagement/${params.id}?tab=${tabValue}&eventLabel=${eventLabel}`,
    },
  ];

  const fetchChargingHistory = async () => {
    try {
      const { data, status } = await axiosInstance.get(
        "charger/fetchChargingHistory",
        {
          params: {
            page: page + 1,
            limit: rowsPerPage,
            stationId: params?.id,
            startDate: startDate,
            endDate: endDate,
            status: chargerType,
            type: typeStatus.toLocaleLowerCase(),
          },
        }
      );
      if (status === 200 || status === 201) {
        setData(data?.data);
      }
    } catch (error) {
      console.error("Error fetching charging history:", error);
    } finally {
      setLoading(false);
    }
  };
  const getDataFromChildHandler = (dateRange, resultArray) => {
    const selectedStartDate = dateRange[0].startDate;
    const selectedEndDate = dateRange[0].endDate;
    setStartDate(selectedStartDate);
    setEndDate(selectedEndDate);
  };
  useEffect(() => {
    fetchChargingHistory();
  }, [page, rowsPerPage, startDate, endDate, chargerType]);
  const getFormattedData = (data) => {
    return data?.map((item) => ({
      Date: item?.createdAt
        ? ` ${moment(item?.updatedAt).format("lll")}`
        : "--",
      "Hub name": hubName ?? "--",
      Status: item?.status ?? "Charging",
      "Truck ID":
        labelStatus === "availabl"
          ? chargerType === "BatteryCharge"
            ? item?.batteryId?.batteryNumber ?? "--"
            : item?.fleetId?.fleetNumber ?? "--"
          : "--",

      "Unit consumed(kWh)": item?.totalConsumption ?? "--",
      "Avg. charging time(hr.)":
        item.meterStopTime && item.meterStartTime
          ? (
              (new Date(item.meterStopTime) - new Date(item.meterStartTime)) /
              3600000
            ).toFixed(2)
          : "--",
    }));
  };

  return (
    <Grid container sm={12} md={12}>
      <ManagementGrid breadcrumbItems={breadcrumbItems} />
      {tabValue &&
        (tabValue === "2" ? (
          <Table
            typeStatus={typeStatus}
            name={`${hubName} (${eventLabel})`}
            columns={vehicle1}
            data={data}
            deviceData={deviceData}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            page={page}
            setPage={setPage}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            loading={loading}
            getFormattedData={getFormattedData}
            getDataFromChildHandler={getDataFromChildHandler}
            handleTableData={fetchChargingHistory}
            chargerType={chargerType}
            setChargerType={setChargerType}
          />
        ) : tabValue === "3" ? (
          <Table
            name={`E-Tractor ID (${params.id})`}
            columns={E_tractor}
            data={data}
            deviceData={deviceData}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            page={page}
            setPage={setPage}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            loading={loading}
            getFormattedData={getFormattedData}
            getDataFromChildHandler={getDataFromChildHandler}
            handleTableData={fetchChargingHistory}
            chargerType={chargerType}
            setChargerType={setChargerType}
          />
        ) : null)}
    </Grid>
  );
};

export default ChargingId;
