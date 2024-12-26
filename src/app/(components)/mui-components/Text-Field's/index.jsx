import React from "react";
import { Stack, TextField, InputAdornment } from "@mui/material";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { TextFieldProps } from "@mui/material";

const CustomTextField = ({
  type,
  label,
  placeholder,
  error,
  helperText,
  name,
  value,
  defaultValue,
  disabled,
  onChange,
  ...props
}) => {
  return (
    <TextField
      {...props}
      name={name}
      label={label}
      error={error}
      variant="outlined"
      defaultValue={defaultValue}
      placeholder={placeholder}
      helperText={helperText}
      onChange={onChange}
      disabled={disabled}
      sx={{
        borderRadius: "8px",
      }}
      InputLabelProps={{ shrink: true }}
      InputProps={
        type
          ? {
              startAdornment: (
                <InputAdornment position="start">
                  {type === "email" && (
                    <MdOutlineMailOutline fontSize="medium" />
                  )}
                  {type === "search" && <FaMagnifyingGlass />}
                </InputAdornment>
              ),
            }
          : {}
      }
    />
  );
};

export default CustomTextField;
