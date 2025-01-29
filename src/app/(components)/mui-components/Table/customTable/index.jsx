import React from "react";
import noData from "../../../../../../public/Img/Nodata.svg";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
  TableHead,
  Box,
  Grid,
} from "@mui/material";

const CustomTable = ({
  rows,
  page,
  columns,
  setPage,
  setRowsPerPage,
  rowsPerPage,
  count,
  loading,
  handleTableData,
}) => {
  const theme = useTheme();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    handleTableData({ page: newPage + 1 });
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    handleTableData({ limit: +event.target.value });
  };

  return (
    <TableContainer
      sx={{
        backgroundColor: "#fff",
        borderRadius: "0px 0px 16px 16px",
        overflowX: "auto",
      }}
    >
      <Table aria-label="custom pagination table">
        <TableHead
          sx={{
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <TableRow>
            {columns?.map((column, index) => (
              <TableCell
                key={index}
                align={
                  index === 0
                    ? "left"
                    : index === columns.length - 1
                    ? "center"
                    : "center"
                }
                sx={{ whiteSpace: "nowrap" }} // Ensure headers don't wrap
              >
                <strong>{column}</strong>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, i) => (
            <TableRow
              key={i}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                overflow: "hidden",
              }}
            >
              {Object.values(row)?.map((ele, ind) => (
                <TableCell
                  key={ind}
                  align={
                    ind === 0
                      ? "left"
                      : ind === Object.values(row).length - 1
                      ? "center"
                      : "center"
                  }
                  component="th"
                  scope="row"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "270px", // Adjust max width as needed
                  }}
                >
                  {!Array.isArray(ele) ? (
                    ele
                  ) : (
                    <Box>{ele?.map((btn) => btn)}</Box>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {!loading && rows?.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 200, // Adjust height as needed
                  }}
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image src={noData} alt="nodata" height={500} width={500} />
                  </Grid>
                </Box>
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TablePagination
              page={page}
              count={count}
              rowsPerPageOptions={[
                10,
                25,
                50,
                100,
                200,
                { label: "All", value: 10000 },
              ]}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
