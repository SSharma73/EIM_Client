import React from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Grid } from '@mui/material';

const index = ({CustomButtonItem}) => {
    return (
        <Grid container spacing={2}>
        {CustomButtonItem?.map((item, index) => (
            <Grid item key={index}>
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button>{item?.label}</Button>
                </ButtonGroup>
            </Grid>
        ))}
    </Grid>
    )
}

export default index