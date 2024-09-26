import React from "react";
import { MenuItem, Menu, Button, IconButton, Divider } from "@mui/material";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    background: "linear-gradient(112.37deg, #589CFF 0%, #013376 116.12%)",
    color: "#fff",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: "#171963",
        color: "#C1FF72",
      },
      "&:hover": {
        backgroundColor: "#171963",
        color: "#C1FF72",
      },
    },
  },
}));

export const CustomDropdownEvent = (props) => {
  const { menuitems, buttonname, onItemSelect, ...rest } = props;
  const [selectedItem, setSelectedItem] = React.useState(buttonname);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
    handleClose();
    if (onItemSelect) {
      onItemSelect(item); // Invoke the parent's onItemSelect function
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {buttonname && (
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          {...rest}
          variant={rest.variant}
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon color="secondary" />}
        >
          {selectedItem}
        </Button>
      )}
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menuitems.map((item, index) => (
          <React.Fragment key={index}>
            <MenuItem onClick={() => handleMenuItemClick(item)} disableRipple>
              {item}
            </MenuItem>
            {index < menuitems.length - 1 && <Divider sx={{ my: 0.5 }} />}
          </React.Fragment>
        ))}
      </StyledMenu>
      {props.name === "iconbutton" && (
        <IconButton
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          {...rest}
          onClick={handleClick}
        >
          <ArrowDropDownOutlinedIcon />
        </IconButton>
      )}
    </>
  );
};
