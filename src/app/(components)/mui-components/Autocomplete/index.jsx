"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Avatar } from "@mui/material";
import Image from "next/image";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function Asynchronous({ icon, place, data }) {
  const [open, setOpen] = React.useState(false);

  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e1);
      if (active) {
        setOptions([...data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      fullWidth
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              background: "transparent",
              padding: "8px 0px",
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fff",
              },
            },
            "& input::placeholder": {
              color: "white",
              fontWeight: 500,
              opacity: 1,
              fontSize: 16,
            },
            "& input": {
              color: "white",
            },
          }}
          variant="outlined"
          {...params}
          placeholder={place}
          InputProps={{
            ...params.InputProps,
            // endAdornment: (
            //   <React.Fragment>
            //     <CiSearch />
            //     {params.InputProps.endAdornment}
            //   </React.Fragment>
            // ),
            startAdornment: (
              <>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: "rgba(193, 255, 114, 0.13)",
                  }}
                >
                  {icon && (
                    <Image width={30} height={30} src={icon} alt={place} />
                  )}
                </Avatar>
              </>
            ),
          }}
        />
      )}
    />
  );
}
