import * as React from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { IoMdLogOut } from "react-icons/io";
import { signOut } from "next-auth/react";
import { ImProfile } from "react-icons/im";
import ProfilePic from "../../../../../public/Img/profile.svg";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
export default function AccountMenu() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    signOut({ callbackUrl: "/login", redirect: true });
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Profile">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, padding: "0px" }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                height: "40px",
                width: "40px",
                backgroundColor: "#38E0CF",
              }}
            >
              <MdOutlineAdminPanelSettings color="#000" size={28} />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "primary",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ width: 34, height: 34, backgroundColor: "#38E0CF" }}>
            <MdOutlineAdminPanelSettings color="#000" size={28} />
          </Avatar>{" "}
          Admin
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose(), router.push("/profile");
          }}
        >
          <ListItemIcon>
            <ImProfile fontSize="medium" />
          </ListItemIcon>
          View Profile
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleClose}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogOut}
            fullWidth
          >
            <ListItemIcon>
              <IoMdLogOut fontSize="medium" />
            </ListItemIcon>
            Logout
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
}
