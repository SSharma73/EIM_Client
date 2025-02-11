import React from "react";
import Menuitems from "./MenuItems";
import { usePathname, useRouter } from "next/navigation";
import { Box, List, Grid, useMediaQuery } from "@mui/material";
import NavItem from "./NavItem/index";
import { uniqueId } from "lodash";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Logo from "../../../../../public/Img/logoEIM.svg";
import { CgProfile } from "react-icons/cg";
// import Logo from "../../../../../public/Img/logoEIM.svg";

const Menuitems1 = [
  {
    id: uniqueId(),
    title: "Profile",
    icon: CgProfile,
    href: "/profile",
    role: ["Admin"],
  },
  {
    id: uniqueId(),
    title: "Log out",
    icon: AiOutlineLogout,
    href: "/login",
  },
];
const SidebarItems = ({ toggleMobileSidebar }) => {
  const router = useRouter();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    signOut({ callbackUrl: "/login", redirect: true });
  };
  const pathname = usePathname();
  const pathDirect = pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <Grid container>
      <Box
        sx={{
          px: 0,
        }}
      >
        <List sx={{ pt: 0 }} className="sidebarNav" component="div">
          {lgUp ? (
            ""
          ) : (
            <Image
              src={Logo}
              height={55}
              width={200}
              onClick={() => router.push("/dashboard")}
              style={{ cursor: "pointer" }}
            />
          )}
          {Menuitems.map((item) => {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
            );
          })}
        </List>
      </Box>
      <Box
        sx={{
          justifyContent: "flex-end",
          alignSelf: "flex-end",
          width: "100%",
          bottom: 0,
        }}
      >
        <List
          sx={{
            pt: 0,
            width: "100%",
            overflow: "hidden",
            minHeight: lgUp ? "30vh" : "15vh",
          }}
          className="sidebarNav"
          component="div"
        >
          {Menuitems1.map((item) => {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={
                  item?.title === "Log out" ? handleLogOut : toggleMobileSidebar
                }
              />
            );
          })}
        </List>
      </Box>
    </Grid>
  );
};
export default SidebarItems;
