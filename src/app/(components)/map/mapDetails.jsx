import React, { useState } from "react";
import { Grid, Typography, IconButton, Stack } from "@mui/material";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import styled from "@emotion/styled";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";

const MainGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: "#6099EB",
  color: "#fff",
  borderRadius: "16px",
}));
const MapDetails = ({ title, icons, onClose }) => {
  const [date, setDate] = useState(null);

  const getDataFromChildHandler = (date, dataArr) => {
    setDate(date);
  };
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
          <Grid container justifyContent={"space-between"} p={1}>
            <CommonDatePicker
              getDataFromChildHandler={getDataFromChildHandler}
            />{" "}
            <Grid item>
              <IconButton onClick={onClose}>
                <IoMdClose color="#fff" />
              </IconButton>
            </Grid>
          </Grid>
        )}

        <Stack rowGap={2} mt={1} p={1}>
          <Typography>Payload</Typography>
          <Typography>SoC</Typography>
          <Typography>SoH</Typography>
          <Typography>Distance travelled</Typography>
          <Typography>Trips</Typography>
        </Stack>
        <Stack rowGap={2} mt={1} p={1}>
          <Typography>20 Ton</Typography>
          <Typography color={"secondary"}>90%</Typography>
          <Typography color={"error"}>28%</Typography>
          <Typography>200 km</Typography>
          <Typography>3</Typography>
        </Stack>
      </Grid>
      <Image src={`${icons}`} height={100} width={500} />
    </MainGrid>
  );
};

export default MapDetails;
