"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Avatar, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Image from "next/image";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function Asynchronous({ icon, place }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      await sleep(1e3);
      if (active) {
        setOptions([...topFilms]);
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
      multiple
      id="asynchronous-demo"
      style={{ width: 360 }}
      options={topFilms}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          sx={{
            "& .MuiInput-underline:before": {},
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottom: "none",
            },
            "& .MuiInput-underline:after": { borderBottom: "none" },
            "& input::placeholder": {
              color: "white",
              fontWeight: 500,
              opacity: 1,
            },
            "& input": { color: "white" },
          }}
          variant="standard"
          {...params}
          placeholder={place}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
            startAdornment: (
              <>
                <Avatar
                  sx={{
                    mr: 2,
                    width: 40,
                    height: 40,
                    backgroundColor: "rgba(193, 255, 114, 0.13)",
                  }}
                >
                  {icon && <Image src={icon} alt={place} />}
                </Avatar>
              </>
            ),
          }}
        />
      )}
    />
  );
}

const topFilms = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
];
