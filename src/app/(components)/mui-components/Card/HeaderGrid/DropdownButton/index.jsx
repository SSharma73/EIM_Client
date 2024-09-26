"use client";
import React from "react";
import { MenuItem, TextField, Grid } from "@mui/material";

export default function CustomSelect({
  customers,
  customerItems,
  setCustomerItems,
}) {
  const handleChange = (event) => {
    const selectedCustomer = customers.menuItems.find(
      (item) => item.label === event.target.value
    );
    setCustomerItems({
      id: selectedCustomer ? selectedCustomer.id : null,
      label: event.target.value,
    });
  };

  return (
    <Grid item ml={2}>
      <TextField
        id="outlined-select-customer"
        select
        label="Select Customer"
        value={customerItems.label}
        onChange={handleChange}
        fullWidth
        sx={{ minWidth: "200px" }}
        variant="outlined"
      >
        <MenuItem value="">
          <em>Select Customer</em>
        </MenuItem>
        {customers?.menuItems?.map((item) => (
          <MenuItem key={item.id} value={item.label}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  );
}
