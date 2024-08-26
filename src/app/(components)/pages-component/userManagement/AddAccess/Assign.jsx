import * as React from 'react';
import { Grid } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AutoBox from '@/app/(DashboardLayout)/(ui-components)/userManagement/autocomplete'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Assign = ({ value }) => {

    return (
        <Grid container justifyContent={"space-between"} md={12} sm={12} xs={12}>
            {value && value === "1" ? [1, 2, 3].map((item, index) => (
                <Autocomplete key={index}
                    multiple
                    id="checkboxes-tags-demo"
                    options={top100Films}
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
                    style={{ width: 360 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Checkboxes" variant="standard" placeholder="Favorites" sx={{ background: 'linear-gradient(111.41deg, rgba(139, 153, 173, 0.36) 0%, rgba(255, 255, 255, 0.12) 100%)' }} />
                    )}
                    componentsProps={{
                        paper: {
                            sx: {
                                background: 'linear-gradient(111.41deg, rgba(139, 153, 173, 0.36) 0%, rgba(255, 255, 255, 0.12) 100%)', // Change to desired background color
                            },
                        },
                        popper: {
                            sx: {
                              '& .MuiAutocomplete-option': {
                                '&:hover': {
                                  backgroundColor: 'rgba(14, 1, 71, 1)',
                                  color: '#C0FE72', // Text color on hover
                                },
                              },
                            },
                          },
                    }}
                />
            )) :
           
                <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    sx={{ ml: value === "2" ? 6 : value === "3" ? 19 : value === "4" ? 38 : value === "5" ? 59 : value === "6" ? 80 : 96 }}
                    options={top100Films}
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
                    style={{ width: 360 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Checkboxes" variant="standard" placeholder="Favorites" />
                    )}
                />
       
                }
                
        </Grid>
    )
}
export default Assign
export const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
];