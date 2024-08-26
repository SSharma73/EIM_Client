import React from "react";
import { Grid, Breadcrumbs, Typography, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});
const CustomBreadcrumbs = ({ breadcrumbItems }) => {
  const pathname = usePathname();
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const isSm = useMediaQuery((theme) => theme.breakpoints.only("sm"));
  const isMd = useMediaQuery((theme) => theme.breakpoints.only("md"));
  const isLg = useMediaQuery((theme) => theme.breakpoints.only("lg"));

  return (
    <Grid
      container
      sx={{
        pr: "12px",
        pt: "6px",
        position: "fixed",
        top: { xs: "7px", sm: "16px", md: "18px", lg: "20px" },
        zIndex: "99",
        width: { xs: "90%", sm: "75%", md: "65%", lg: "60%" },
        marginLeft: isXs
          ? "50px"
          : isSm
          ? "60px"
          : isMd
          ? "60px"
          : "flex-start", // Align breadcrumbs to the right on small screens
      }}
      direction="row"
      alignItems="center"
    >
      <Breadcrumbs
        separator=">"
        aria-label="breadcrumb"
        sx={{ width: { xs: "55%", sm: "100%" }, color: "#fff" }}
      >
        {breadcrumbItems.map((item, index) => {
          // const Data = item?.icon
          return (
            // <Link href={item.link} key={index}
            //   underline="hover"
            //   sx={{ display: 'flex', alignItems: 'center', }}

            // >
            //   /* <StyledBreadcrumb
            //     component="a"
            //     label={item.label}
            //     icon={Data && <Data fontSize="small" />}
            //   /> */

            //   <Typography
            //     color={pathname === item.link ? "#C1FF72" : "#fff"}
            //     variant="h6"
            //     sx={{
            //       display: 'flex',
            //       alignItems: 'center',
            //       cursor: pathname !== item.link ? "pointer" : "initial",
            //     }}
            //   >{Data && <Data sx={{ mr:0.5 }} fontSize="inherit" />}
            //     {item?.label}
            //   </Typography>
            // </Link>
            <Link href={item.link} key={index}>
              <Typography
                color={pathname === item.link ? "#C1FF72" : "#fff"}
                variant="h6"
                sx={{
                  cursor: pathname !== item.link ? "pointer" : "initial",
                }}
              >
                {item.label}
              </Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    </Grid>
  );
};

export default CustomBreadcrumbs;
