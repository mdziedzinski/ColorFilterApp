import React, { useState, useEffect, ChangeEvent } from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, colors, lighten } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import BasicModal from "./Modal";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";
import { Suspense } from "react";

const TableColor = () => {
  const [Loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");
  const [pages, setPages] = useState<any>(searchParams.get("pages") || 0);

  const [countItems, setCountItems] = useState<any>(-1);
  const [countPages, setCountPages] = useState<any>([]);

  const [colorsData, setColorsData] = useState<any>([]);

  const [term, setTerm] = useState<any>(searchParams.get("term"));

  useEffect(() => {
    const fetchColors = async () => {
      setLoading(true);
      const res = await axios
        .get(`https://reqres.in/api/products`, {
          params: {
            id: term ? term : "",
            page: pages + 1,
            per_page: 5,
          },
        })
        .then((res) => {
          if (term) {
            setColorsData([res.data.data]);
            setCountItems([res.data.data].length);
            // setRowsPerPage(res.data.per_page);
          } else {
            setColorsData(res.data.data);
            // setCountRows(res.data.per_page);
            setCountItems(res.data.total);
            setCountPages(res.data.total_pages);
          }
          setShowError(false);
          setLoading(false);
        })
        .catch((reason: AxiosError) => {
          setShowError(true);
          setErrorCode(reason.message);
          setTimeout(() => {
            setShowError(false);
          }, 5000);
        });
    };
    fetchColors();
  }, [term, pages]);

  interface Column {
    id: "id" | "name" | "year";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    {
      id: "id",
      label: "id",
      minWidth: 50,
      align: "right",
    },
    {
      id: "name",
      label: "name",
      minWidth: 100,
      align: "right",
    },
    {
      id: "year",
      label: "year",
      minWidth: 50,
      align: "right",
    },
  ];

  interface Data {
    id: number;
    name: string;
    year: number;
  }

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTerm(value == null ? "" : value);
    setSearchParams({
      term: value ? value : "",
      page: pages + 1,
    });
    console.log(term);
  };

  const handleChangePage = (event: unknown, newPage: any) => {
    setPages(newPage);
    setSearchParams({
      term: term ? term : "",
      page: newPage ? newPage + 1 : 1,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
  };

  const rows = colorsData;
  const [open, setOpen] = React.useState(false);
  const [modalColor, setModalColor] = useState([]);
  const dataModalColor = Object.values(modalColor);
  const tableCellClickHandler = (row: any) => {
    setOpen(true);
    setModalColor(row);
  };

  const renderError = () => {
    if (showError === true) {
      return (
        <>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This is an error alert — <strong>{errorCode}</strong>
          </Alert>
        </>
      );
    }
  };

  return (
    <>
      <TextField
        sx={{ m: "2rem", align: "center"}}
        id="outlined-basic"
        label="Sarch for id"
        variant="outlined"
        type="number"
        value={term || ""}
        onChange={onInputChange}
        
      />
      {errorCode ? renderError() : false}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                // .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)

                .map((row: any) => {
                  return (
                    <TableRow
                      onClick={() => tableCellClickHandler(row)}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: `${row.color}`,
                        ":hover": {
                          backgroundColor: lighten(`${row.color}`, 0.2),
                        },
                      }}
                      tabIndex={-1}
                      key={row.id}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={countItems}
          rowsPerPage={rowsPerPage}
          page={pages}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <BasicModal
        infoColor={
          <Typography
            id="modal-modal-description"
            sx={{ span: { display: "block" } }}
          >
            <span>ID: {dataModalColor[0]}</span>
            <span>Name: {dataModalColor[1]}</span>
            <span>Year: {dataModalColor[2]}</span>
            <span>Color HEX value: {dataModalColor[3]}</span>
            <span>Color Pantone value: {dataModalColor[4]}</span>
          </Typography>
        }
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default TableColor;
