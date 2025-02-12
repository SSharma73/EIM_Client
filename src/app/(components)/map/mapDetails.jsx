import React, { useState } from "react";
import { Grid, Typography, IconButton, Stack } from "@mui/material";
import styled from "@emotion/styled";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";

const MainGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,

  borderRadius: "16px",
}));
const MapDetails = ({ title, icons, onClose, truckDetails }) => {
  const [date, setDate] = useState(null);
  // console.log("truckDetails", `"${icons}"`);

  return (
    <MainGrid container rowGap={1}>
      <Grid container justifyContent={"space-between"}>
        {title ? (
          <Grid
            container
            sx={{
              backgroundColor: "#161861",
              p: 1,
              borderRadius: "16px 16px 0 0",
            }}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h5">{title}</Typography>
            <IconButton onClick={onClose}>
              <IoMdClose color="secondary" />
            </IconButton>
          </Grid>
        ) : (
          <Grid
            container
            justifyContent={"space-between"}
            p={1}
            alignItems={"center"}
          >
            <Grid item>
              <Typography variant="h4">{truckDetails?.fleetNumber}</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={onClose}>
                <IoMdClose />
              </IconButton>
            </Grid>
          </Grid>
        )}

        <Stack rowGap={2} mt={1} p={1}>
          <Typography>Effective Range</Typography>
          <Typography>Nearest Charger</Typography>
          <Typography>Station Code</Typography>
          <Typography>Type</Typography>
          <Typography>Average Speed</Typography>
        </Stack>
        <Stack rowGap={2} mt={1} p={1}>
          <Typography>
            {truckDetails?.effectiveRange
              ? truckDetails?.effectiveRange?.toFixed(3)
              : 0}
          </Typography>
          <Typography color={"secondary"}>
            {truckDetails?.nearestCharger?.name}
          </Typography>
          <Typography color={"error"}>
            {" "}
            {truckDetails?.nearestCharger?.stationCode}
          </Typography>
          <Typography color={"secondary"}>{truckDetails?.type}</Typography>
          <Typography>
            {truckDetails?.averageSpeed
              ? truckDetails?.averageSpeed.toFixed(3)
              : "--"}
          </Typography>
        </Stack>
      </Grid>
      <Image src={`${icons}`} height={100} width={280} />
    </MainGrid>
  );
};

export default MapDetails;
