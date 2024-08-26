import React from "react";
import { AppBar, Grid, styled, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import Profile from "./Profile";
import { LuMenu } from "react-icons/lu";
import Image from "next/image";
import Logo from "../../../../../public/Img/logo.png";
import Notification from "./Notification";

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  transition: "none",
  padding: "12px 35px 12px 35px",
  color: theme.palette.text.primary,
  zIndex: "10",
  [theme.breakpoints.down("sm")]: {
    padding: "18px 15px 25px 15px",
  },
  backgroundColor: theme.palette.primary.main,
}));

const Header = ({ toggleMobileSidebar }) => {
  return (
    <AppBarStyled position="sticky" color="default">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={toggleMobileSidebar}
            sx={{
              color: "",
              display: {
                lg: "none",
                xs: "flex",
              },
            }}
          >
            <LuMenu width="22" height="22" />
          </IconButton>
          <Grid
            sx={{
              height: "50px",
              display: {
                lg: "flex",
                xs: "none",
              },
            }}
          >
            <Image src={Logo} height={55} width={200} />
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" spacing={2}>
            {/* Uncomment Notification component if needed */}
            <Grid item>
              <Notification />
            </Grid>
            <Grid item>
              <Profile />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppBarStyled>
  );
};

Header.propTypes = {
  toggleMobileSidebar: PropTypes.func.isRequired,
};

export default Header;
