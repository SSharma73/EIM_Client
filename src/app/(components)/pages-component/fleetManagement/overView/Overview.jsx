"use client";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Badge,
  List,
  ListItem,
  ListItemText,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import Map from "@/app/(components)/map/map";
import axiosInstance from "@/app/api/axiosInstance";
import MapDetails from "@/app/(components)/map/mapDetails";
import Graph from "@/app/(components)/pages-component/fleetManagement/vehicle/graph";
import Graph2 from "@/app/(components)/pages-component/fleetManagement/vehicle/graph2";
import Graph3 from "@/app/(components)/pages-component/fleetManagement/vehicle/graph3";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import { CustomDropdownEvent } from "@/app/(components)/mui-components/Card/HeaderGrid/DropdownButton/dropDownEvent";
import { useRouter } from "next/navigation";
import { IoMdDownload } from "react-icons/io";
import DownloadData from "@/app/(components)/pages-component/fleetManagement/overView/download";

const CustomGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.light,
  borderRadius: "16px",
}));

const Badge1 = styled(Badge)(({ color }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: color,
    width: "10px",
    height: "10px",
    borderRadius: "50%",
  },
  marginLeft: "10px",
}));

const Overview = ({
  data,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  loading,
}) => {
  const [distance, setDistance] = useState(false);
  const [payload, setPayload] = useState(false);
  const [trips, setTrips] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);
  const [icons, setIcons] = useState(null);
  const router = useRouter();
  const [openDownload, setOpenDownload] = useState(false);
  const [graphData, setGraphData] = useState([]);
  const [fleetNumber, setFleetNumber] = useState(null);
  const days = ["Today", "Weekly", "Monthly", "Yearly"];
  const data1 = [
    {
      content: graphData?.fleetCount,
      value: "E-tractor",
      avg: graphData?.averageDistance?.toFixed(2),
      titleParts: [
        {
          text: "Distance travelled ",
          style: { fontSize: "16px", fontWeight: 600 },
        },
        { text: "(km)", style: { fontSize: "13px", fontWeight: 600 } },
      ],
      label: "View report",
      data: "Distance travelled",
      handleFunction: () => setDistance(true),
    },
    {
      content: "0",
      value: "Vehicle",
      avg: "0 (Ton)",
      titleParts: [
        { text: "Trip payload ", style: { fontSize: "16px", fontWeight: 600 } },
        { text: "(Ton)", style: { fontSize: "13px", fontWeight: 600 } },
      ],
      label: "View report",
      data: "Trip payload",
      handleFunction: () => setPayload(true),
    },
    {
      content: "0",
      value: "Vehicle",
      avg: "0 (kWh)",
      titleParts: [
        { text: "Trips ", style: { fontSize: "16px", fontWeight: 600 } },
        {
          text: "(Units consumed)",
          style: { fontSize: "13px", fontWeight: 600 },
        },
      ],
      label: "View report",
      data: "Trips",
      handleFunction: () => setTrips(true),
    },
  ];
  const [selectedTimeFrames, setSelectedTimeFrames] = useState(
    data1?.map(() => days[0])
  );
  const handleOpenDownload = (fleetNumber) => {
    setOpenDownload(true);
    setFleetNumber(fleetNumber);
  };
  const calculateDateRange = (timeFrame) => {
    const endDate = dayjs().format("YYYY-MM-DD");
    let startDate;
    switch (timeFrame) {
      case "Today":
        startDate = endDate;
        break;
      case "Weekly":
        startDate = dayjs().subtract(7, "days").format("YYYY-MM-DD");
        break;
      case "Monthly":
        startDate = dayjs().startOf("month").format("YYYY-MM-DD");
        break;
      case "Yearly":
        startDate = dayjs().startOf("year").format("YYYY-MM-DD");
        break;
      default:
        startDate = endDate;
    }
    return { startDate, endDate };
  };

  const handleTimeFrameChange = (index, newTimeFrame) => {
    const updatedTimeFrames = [...selectedTimeFrames];
    updatedTimeFrames[index] = newTimeFrame;
    setSelectedTimeFrames(updatedTimeFrames);
  };
  const fetchGraphData = () => {
    const { startDate, endDate } = calculateDateRange(selectedTimeFrames[0]);
    axiosInstance
      .get("dashboard/getGraphData", {
        params: { startDate, endDate },
      })
      .then((response) => {
        setGraphData(response?.data || []);
      })
      .catch((error) => {
        console.error("Error fetching graph data:", error);
      });
  };

  useEffect(() => {
    fetchGraphData();
  }, [selectedTimeFrames]);

  const getFormattedData = (data) => {
    return data?.map((item, index) => ({
      region: item?.region ?? "--",
      fleetId: item.fleetNumber ?? "--",
      status: <Typography variant="body2"> {item.status || "--"}</Typography>,
      FleetStatus: (
        <Box>
          <Chip
            size="small"
            sx={{
              backgroundColor:
                item.isConnected === "offline"
                  ? "orange"
                  : item.isConnected === "disconnected"
                  ? "red"
                  : "green",
              color: "white",
            }}
            label={<Typography variant="body2">{item.isConnected}</Typography>}
          />
        </Box>
      ),
      lastConnectedHeartBeat: (
        <Box>
          <Typography variant="body2">
            {dayjs(item?.lastConnectedHeartBeat).format(
              "hh:mm:ss A DD/MM/YYYY"
            ) ?? "--"}
          </Typography>
        </Box>
      ),
      avgSpeed: item?.averageSpeed.toFixed(1) || "--",
      avgPayload: item?.avgPayload || "--",
      totalDistance: item?.distanceTravelled
        ? `${item?.distanceTravelled?.toFixed(2)} KM`
        : "--",
      avgConsumption: item?.avgConsumption.toFixed(2) || "--",
      breakdown: item?.breakdown || "--",
      currentSoc: item?.batteryPercentage
        ? `${item?.batteryPercentage?.toFixed(2)}%`
        : "--",
      effectiveRange: item?.effectiveRange || "--",
      Action: (
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Tooltip title="Download rawData">
              <IconButton
                size="small"
                onClick={() => handleOpenDownload(item.fleetNumber)}
              >
                <IoMdDownload color="rgba(14, 1, 71, 1)" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      ),
    }));
  };

  const handleMapData = (index, point) => {
    setActiveMarker(index);
    setIcons(point);
  };

  const onClose = () => {
    setActiveMarker(null);
  };
  const getTimeFrameDurationInHours = (timeFrame) => {
    switch (timeFrame) {
      case "Today":
        return 24;
      case "Weekly":
        return 7;
      case "Monthly":
        return 30;
      case "Yearly":
        return 12;
      default:
        return 0;
    }
  };

  const progressValue = graphData?.result?.length
    ? (graphData?.result?.length /
        getTimeFrameDurationInHours(selectedTimeFrames[0])) *
      100
    : 0;

  return (
    <Grid container spacing={2}>
      {data1.map((item, index) => (
        <Grid key={index} item xl={4} lg={4} md={4} sm={6} xs={12}>
          <CustomGrid>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography>
                {item.titleParts.map((part, idx) => (
                  <span key={idx} style={part.style}>
                    {part.text}
                  </span>
                ))}
              </Typography>
              <CustomDropdownEvent
                variant="contained"
                size="small"
                menuitems={days}
                buttonname={selectedTimeFrames[index]}
                onItemSelect={(newTimeFrame) =>
                  handleTimeFrameChange(index, newTimeFrame)
                }
              />
            </Grid>
            <Typography
              color={"primary"}
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              E-Tractor :{" "}
              <span style={{ fontWeight: 700 }}>{item.content}</span>
            </Typography>
            <Typography
              color={"primary"}
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              Avg :{" "}
              <span style={{ fontSize: "11px", fontWeight: 700 }}>
                {item.avg}
              </span>
            </Typography>
            {index === 0 && (
              <>
                <Graph graphData={graphData && graphData?.result} />{" "}
                {/* <LinearProgress
                  variant="determinate"
                  value={progressValue}
                  sx={{ border: "0.6px" }}
                />{" "} */}
              </>
            )}
            {index === 1 && (
              <>
                <Graph2 />
                {/* <LinearProgress
                  variant="determinate"
                  value={0}
                  sx={{ border: "0.6px" }}
                /> */}
              </>
            )}
            {index === 2 && (
              <>
                <Graph3 />
                {/* <LinearProgress
                  variant="determinate"
                  value={0}
                  sx={{ border: "0.6px" }}
                /> */}
              </>
            )}
            <List>
              <ListItem
                disableGutters
                key={index}
                // secondaryAction={
                //   <Button
                //     variant="text"
                //     color="secondary"
                //     onClick={item.handleFunction}
                //   >
                //     {item.label}
                //   </Button>
                // }
              >
                <Badge1 color="secondary" variant="dot" />
                <ListItemText primary={item.data} sx={{ marginLeft: "10px" }} />
              </ListItem>
            </List>
          </CustomGrid>
        </Grid>
      ))}

      {activeMarker && (
        <Grid item xs={12} md={9} sm={8} height={"380px"}>
          <Map
            handleMapData={handleMapData}
            iconUrls={iconUrls}
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
            buttonData={buttonData}
            coordinate={coordinate}
            onClose={onClose}
          />
        </Grid>
      )}
      {activeMarker && (
        <Grid item md={3} xs={12} sm={4} height={"380px"}>
          <MapDetails icons={icons} onClose={onClose} title={"Fleet Data"} />
        </Grid>
      )}
      <Grid item xs={12}>
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
            columns={[
              "Region",
              "E-tractor ID",
              "Status",
              "Fleet status",
              "Last connected",
              "Avg. speed (km/hr)",
              "Avg. payload (Ton)",
              "Total distance travelled(km)",
              "Avg. consumption(kWh/km)",
              "Breakdown",
              "Current SoC(%)",
              "Effective range(km)",
              "Action",
            ]}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        )}
      </Grid>
      {openDownload && (
        <DownloadData
          open={openDownload}
          setOpen={setOpenDownload}
          fleetNumber={fleetNumber}
        />
      )}
    </Grid>
  );
};

export default Overview;
