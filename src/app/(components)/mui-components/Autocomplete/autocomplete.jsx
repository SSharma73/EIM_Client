import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Avatar, useTheme } from "@mui/material";
import Image from "next/image";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function Asynchronous({ icon, place, data, onChange }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const theme = useTheme();

  React.useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(100);
      if (active) {
        setOptions([...data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, data]);

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
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      onChange={(event, value) => {
        onChange(value);
      }}
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
                borderColor: "#000",
              },
            },
            "& input::placeholder": {
              color: "#000",
              fontWeight: 500,
              opacity: 1,
              fontSize: 16,
            },
            "& input": {
              color: "#000",
            },
          }}
          variant="outlined"
          {...params}
          placeholder={place}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: theme.palette.primary.main,
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
