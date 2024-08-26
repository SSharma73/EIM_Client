"use client"
import * as React from 'react';
import { Paper, Grid, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { CustomDropdown } from '@/app/(components)/mui-components/DropdownButton/index';
import { CustomDownloadExcel } from '@/app/(components)/mui-components/DownloadExcel/index';
import Image from 'next/image';
import NodataImg from '../../../../public/Img/Nodata.svg'

function StickyHeadTable({ columns, renderActions, buttons, rows, status }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: "16px", backgroundColor: '#6099EB'}}>
      <TableContainer sx={{ maxHeight: 700 }}>
        {buttons && buttons.map((item, index) => (
          <Grid key={index} container justifyContent="space-between" alignItems="center" p={2}>
            <Typography variant='h4' color={"#fff"}>{item.data}</Typography>
            <Grid item>
              {item.customdownload && <CustomDownloadExcel key={index} name={item.customdownload} rows={rows} data={item.data} />}
              {item.regiondropdown && item.regiondropdown.map((item, index) => (<CustomDropdown key={index} buttonname={item.name} variant={item.variant} region={item.region} />))}
              {item.dailydropdown && item.dailydropdown.map((item, index) => (<CustomDropdown key={index} buttonname={item.name} variant={item.variant} region={item.days} />))}
              {item.button && <Button variant='contained'>View All</Button>}
            </Grid>
          </Grid>
        ))}
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
               { columns && columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ backgroundColor: "#171963", color: "#fff", padding: "15px" }}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {columns && rows && rows.length > 0 ? (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.value}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "action" ? (
                          <>{renderActions()}</>
                        ) : column.id === "status" || column.id === "TotalTripDay" || column.id === "TotalTripmonth" || column.id === "chargingcycle" || column.id === "swappingcycle" ? (
                          <>{status(row[column.id])}</>
                        ) : (
                          <>{column.format && typeof row[column.id] === 'number' ? column.format(row[column.id]) : row[column.id]}</>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns?.length}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    p={4}
                  >
                    <Grid item>
                      <Image src={NodataImg } alt="No Data Image" height={500} width={500} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" component="h5">
                        No Data Found
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default StickyHeadTable;
