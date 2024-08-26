"use client";
import React, {
  useState,
  Fragment,
} from "react";
import Box from "@mui/material/Box";
import { Button, Typography, Badge, Grid,Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { styled, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiMenu from "@mui/material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import notificationImg from "../../../../../public/Img/bell.gif";
import axiosInstance from "@/app/api/axiosInstance";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

const theme = createTheme();
const Menu = styled(MuiMenu)(({ theme }) => ({
  "& .MuiMenu-paper": {
    width: 380,
    overflow: "hidden",
    marginTop: theme.spacing(4),
    [theme?.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  "& .MuiMenu-list": {
    padding: 0,
  },
}));
const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    backgroundColor: "transparent", 
    color: theme.palette.secondary.main, 
  },
}));
const styles = {
  maxHeight: 349,
  overflowY: "scroll",
  "& .MuiMenuItem-root:last-of-type": {
    border: 0,
  },
};
const MenuItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  flex: "1 1 100%",
  overflow: "hidden",
  fontSize: "0.875rem",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  marginBottom: theme.spacing(0.75),
}));
const MenuItemSubtitle = styled(Typography)`
  flex: "1 1 100%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
`;
const ScrollWrapper = ({ children }) => {
  const hidden = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box
      sx={{
        ...styles,
        overflowY: hidden ? "auto" : "scroll",
        overflowX: "hidden",
      }}
    >
      {children}
    </Box>
  );
};

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dummyData, SetDummyData] = useState(null);
  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDropdownClose = () => {
    setAnchorEl(null);
  };
  // const getData = async () => {
  //   try {
  //     const res = await axiosInstance.get(`/api/notification`);
  //     if (res.status === 200 || res.status === 201) {
  //       console.log(res);
  //       SetDummyData(res?.data?.data?.result);
  //     }
  //   } catch (err) {}
  // };
  // useEffect(() => {
  //   getData();
  // }, []);
  return (
    <Fragment>
      <Avatar sx={{width: 34, height: 34,backgroundColor:"#202E79"}}>
      <IconButton
        aria-haspopup="true"
        onClick={handleDropdownOpen}
        aria-controls="customized-menu"
      >
        <Badge
          color="warning"
          // sx={{
          //   "& .MuiBadge-badge": {
          //     backgroundColor: "red",
          //     color: "white",
          //   },
          // }}
          max={999}
          // badgeContent="0"
        >
          <NotificationsNoneIcon sx={{ fontSize: "22px",color:"#C0FE72" }} />
        </Badge>
      </IconButton>
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem disableRipple>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography align="center" sx={{ fontWeight: 600, width: "100%" }}>
              Notifications
            </Typography>
          </Box>
        </MenuItem>
        <ScrollWrapper>
          {dummyData ? (
            <>
              {dummyData?.map((item ,index) => (
                <MenuItem key={index}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        flex: "1 1",
                        display: "flex",
                        overflow: "hidden",
                        flexDirection: "column",
                      }}
                    >
                      <MenuItemTitle className="tablecrow-cell-bg">
                        {item?.name}
                      </MenuItemTitle>
                      <MenuItemTitle sx={{ fontSize: "10px", color: "gray" }}>
                        {item?.message}
                      </MenuItemTitle>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.disabled" }}
                    >
                      {moment(item?.date).format("ll")}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </>
          ) : (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ width: "100%", height: "40vh" }}
              direction="column"
            >
              <Grid container justifyContent="center">
                <Image
                  src={notificationImg}
                  alt="notification"
                  width={150}
                  height={150}
                />
              </Grid>
              <Typography className="fs20px">
                No notifications to show yet
              </Typography>
              <Typography
                align="center"
                className="fs16px"
                sx={{ color: "#C0FE72", width: "90%" }}
              >
                You’ll see useful information here soon. Stay tuned!
              </Typography>
            </Grid>
          )}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          sx={{
            padding: "16px 16px",
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Button
            fullWidth
            href="/notifications"
            component={Link}
            variant="contained"
            style={{
              color: "#fff",
              border: `1px solid #fff`,
            }}
            onClick={handleDropdownClose}
          >
            View All Notifications
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default Notification;
