import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  useTheme,
} from "@mui/material";

const CustomTable = ({
  rows,
  page,
  columns,
  setPage,
  setRowsPerPage,
  rowsPerPage,
  actions = [],
}) => {
  const handleChangePage = (even, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
  };
  const theme = useTheme();

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Table aria-label="custom pagination table">
        <TableBody>
          <TableRow>
            {columns.map((column, colIndex) => (
              <TableCell key={colIndex} align={column.align}>
                <strong>{column.label}</strong>
              </TableCell>
            ))}
            {actions.length > 0 && (
              <TableCell align="center">
                <strong>Action</strong>
              </TableCell>
            )}
          </TableRow>
          {rows &&
            rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} align={column.align}>
                    {row[column.id]}
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell align="center">
                    {actions.map((action, index) => (
                      <React.Fragment key={index}>{action}</React.Fragment>
                    ))}
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              page={page}
              count={rows.length}
              rowsPerPageOptions={[5, 10, 25]}
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
