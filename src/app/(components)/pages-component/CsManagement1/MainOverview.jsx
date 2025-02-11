import { Grid, Typography, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Graph from "./overview/Graph/graph";
import Graph2 from "./overview/Graph/graph2";
import Graph3 from "./overview/Graph/graph3";
import { CustomDropdownEvent } from "@/app/(components)/mui-components/Card/HeaderGrid/DropdownButton/dropDownEvent";
import axiosInstance from "@/app/api/axiosInstanceImg";
import Overview from "@/app/(components)/pages-component/CsManagement1/overview/Overview";
import TimerIcon from "@mui/icons-material/Timer";
import styled from "@emotion/styled";
import ManagementGrid from "../../mui-components/Card";
import dayjs from "dayjs";

const CustomGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: "16px",
}));
const Overview1 = ({ type, selectedItems, selectedCustId }) => {
  const [value, setValue] = useState(0);
  const [fetchAllDetails, setFetchAllDetails] = useState(null);

  // console.log("selectedItems", selectedItems, selectedCustId);
  const fetchDetails = async ({
    limit = 10,
    page = 1,
    status = "",
    type = "",
    customerId = selectedCustId ?? "",
    region = selectedItems?.Region ?? "",
  } = {}) => {
    try {
      const params = new URLSearchParams({
        limit,
        page,
        status,
        type,
        customerId,
        region,
      });
      const { data } = await axiosInstance.get(
        `charger/fetchChargers?${params.toString()}`
      );
      setFetchAllDetails(data?.data);
    } catch (error) {
      console.error("Error fetching chargers:", error);
      throw error;
    }
  };

  const handleChange = (event, newValue) => {
    let status = "";
    let type = "";
    switch (newValue) {
      case 0:
        status = "";
        type = "";
        break;
      case 1:
        status = "";
        type = "delta";

        break;
      case 2:
        status = "";
        type = "sany";
        break;
      case 3:
        status = "available";
        type = "";
        break;
      case 4:
        status = "offline";
        type = "";
        break;
      default:
        status = "";
        type = "";
        break;
    }
    setValue(newValue);
    fetchDetails({
      search: "",
      limit: 10,
      page: 1,
      status: status,
      type: type,
      customerId: selectedCustId ?? "",
      region: selectedItems?.Region ?? "",
    });
  };
  useEffect(() => {
    fetchDetails({
      search: "",
      limit: 10,
      page: 1,
      type: "",
      customerId: selectedCustId ?? "",
      region: selectedItems?.Region ?? "",
    });
  }, [selectedCustId, selectedItems?.Region]);

  const tabs = [
    { label: "Overview" },
    { label: "Charging" },
    { label: "Swapping" },
    { label: "Available" },
    { label: "Offline" },
  ];
  const TabPanelList = [
    { component: <Overview fetchAllDetails={fetchAllDetails} /> },
    { component: <Overview fetchAllDetails={fetchAllDetails} /> },
    { component: <Overview fetchAllDetails={fetchAllDetails} /> },
    { component: <Overview fetchAllDetails={fetchAllDetails} /> },
    { component: <Overview fetchAllDetails={fetchAllDetails} /> },
  ];
  const data = [
    { title: "No. of session", content: "400" },
    { title: "Usage", content: "1947.33 kWh" },
    { title: "Up time", content: "400" },
  ];
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

  const days = ["Daily", "Weekly", "Monthly", "Yearly"];
  const [selectedTimeFrames, setSelectedTimeFrames] = useState(
    data?.map(() => days[0])
  );

  const handleTimeFrameChange = (index, newTimeFrame) => {
    const updatedTimeFrames = [...selectedTimeFrames];
    updatedTimeFrames[index] = newTimeFrame;
    setSelectedTimeFrames(updatedTimeFrames);
  };
  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid key={index} item xl={4} md={4} sm={12} xs={12}>
          <CustomGrid>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="h6">
                <TimerIcon sx={{ verticalAlign: "middle", p: "3px" }} />{" "}
                {item.title}
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

            {index === 0 && (
              <Graph
                calculateDateRange={calculateDateRange}
                type={type}
                selectedCustId={selectedCustId}
                selectedItems={selectedItems?.Region}
                selectedTimeFrames={selectedTimeFrames[0]}
              />
            )}
            {index === 1 && (
              <Graph2
                calculateDateRange={calculateDateRange}
                type={type}
                selectedCustId={selectedCustId}
                selectedItems={selectedItems?.Region}
                selectedTimeFrames={selectedTimeFrames[1]}
              />
            )}
            {index === 2 && (
              <Graph3
                graphType={selectedTimeFrames[index].toLowerCase()}
                type={type}
              />
            )}
            <Divider sx={{ mb: 3 }} />
          </CustomGrid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <ManagementGrid
          tabs={tabs}
          TabPanelList={TabPanelList}
          value={value}
          handleChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default Overview1;
