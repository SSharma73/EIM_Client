"use client"
import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import ManagementGrid from '@/app/(components)/mui-components/Card'
import Table from './table'
import {useRouter} from 'next/navigation'
import { Fleet ,dummyCustomerData} from '@/app/(components)/table/rows'
import axiosInstance from '@/app/api/axiosInstance'


const CustomerManagement = () => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [deviceData, setDeviceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);
  const [openGraph, setOpenGraph] = useState(false)

  const getDataFromChildHandler = (date, dataArr) => {
    setDate(date);
  };
  const router =useRouter();
  const handleCustomerData =async()=>{
    try {
      const response=await axiosInstance.get(`/port/getAll?page=${page + 1
        }&pageSize=${rowsPerPage}&search=${searchQuery}`)
      console.log(response)
      setData(response?.data)

    } catch (error) {
      console.log(error)
      
    }
  }
  const AddPort =()=>{
      router.push('/customerManagement/addPort')
  }
  const buttons = [
    {
      data: "region Data Sheet", customdownload: "Download Excel",
      dailydropdown: [{ name: "Today", variant: "contained", }]
    }
  ];
  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "Customer-Management", link: "/customerManagement" },
  ];
useEffect(()=>{
  handleCustomerData()
},[])
  return (
    <Grid container rowGap={2}>
      <ManagementGrid breadcrumbItems={breadcrumbItems} moduleName={"Customer Management"} button={"Add Port"} handleClickOpen={AddPort}/>
      <Table
        data={data}
        deviceData={deviceData}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        page={page}
        setPage={setPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        loading={loading}
        getDataFromChildHandler={getDataFromChildHandler}
      />
    </Grid>
  )
}

export default CustomerManagement
