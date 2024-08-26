import { Button } from '@mui/material';
import React from 'react'
import Papa from 'papaparse';
import { FaRegFileExcel } from "react-icons/fa";

const index = () => {
    
  return (
   <Button  variant='outlined'  startIcon={<FaRegFileExcel />}     size="large">Download Excel</Button>
  )
}

export default index