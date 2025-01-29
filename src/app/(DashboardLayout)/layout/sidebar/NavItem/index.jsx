import React from "react";
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  ListItemButton,
  useMediaQuery,
} from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavItem = ({ item, level, pathDirect, onClick }) => {
  const Icon = item.icon;
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;
  const pathname = usePathname();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const ListItemStyled = styled(ListItem)(({ theme }) => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "12px",
      padding: "8px 1px",
      borderRadius: "14px",
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: "#000",
      paddingLeft: "10px",
      "&:hover": {
        backgroundColor: "#38E0CF",
        color: "#000",
      },
      "&:hover .MuiListItemIcon-root": {
        color: "#000",
      },
      "&.Mui-selected": {
        color: "#000",
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          color: "#000",
        },
        "&:hover .MuiListItemIcon-root": {
          color: "#000000",
        },
        "& .MuiListItemIcon-root": {
          color: "#000",
        },
      },
    },
    [theme.breakpoints.down("sm")]: {
      ".MuiButtonBase-root": {
        padding: "8px 12px",
      },
    },
  }));

  const isNavLinkActive = () => {
    return pathname === item.href;
  };

  return (
    <List component="div" disablePadding key={item.id}>
      <ListItemStyled>
        <ListItemButton
          component={Link}
          href={item.href}
          disabled={item.disabled}
          selected={pathDirect.startsWith(item.href)}
          target={item.external ? "_blank" : ""}
          onClick={onClick}
        >
          <ListItemIcon
            sx={{
              minWidth: isMobile ? "auto" : "36px",
              p: "3px 0",
              color: isNavLinkActive() ? "#000" : "#000",
              transition: "margin .25s ease-in-out",
              fontSize: "24px",
            }}
          >
            {itemIcon}
          </ListItemIcon>
          <ListItemText sx={{ px: 2 }}>{item.title}</ListItemText>
        </ListItemButton>
      </ListItemStyled>
    </List>
  );
};

export default NavItem;
