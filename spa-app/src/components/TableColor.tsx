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
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { query } from "express";
import { JsxFlags } from "typescript";
import { useSearchParams } from "react-router-dom";

const TableColor = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState<any>(searchParams.get("pages") || 0);

  const [countItems, setCountItems] = useState<any>([]);
  const [countPages, setCountPages] = useState<any>([]);

  const [colorsData, setColorsData] = useState<any>([]);

  const [term, setTerm] = useState<any>(searchParams.get("term"));

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTerm(value);
    setSearchParams({
      term: value,
      page: pages+1,
    });
    console.log(term);
  };

  useEffect(() => {
    const fetchColors = async () => {
      const res = await axios.get(`https://reqres.in/api/products`, {
        params: {
          id: term ? term : "",
          page: pages + 1,
          per_page: 5,
        },
      });
      if (term) {
        setColorsData([res.data.data]);

        // setRowsPerPage(res.data.per_page);
      } else {
        setColorsData(res.data.data);
        // setCountRows(res.data.per_page);
        setCountItems(res.data.total);
        setCountPages(res.data.total_pages);
      }
    };
    fetchColors();
  }, [term, pages]);

  console.log("to jest colors data");
  console.log(colorsData);
  console.log(pages);

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

  const handleChangePage = (event: unknown, newPage: any) => {
    setPages(newPage);
    setSearchParams({
      term: term,
      page: newPage ? newPage + 1 : 1,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
  };

  console.log("rowsperpage");
  console.log(rowsPerPage);
  console.log("konsologuje pages");
  console.log(pages);
  const rows = colorsData;
  return (
    <>
      <TextField
        sx={{ m: "2rem" }}
        id="outlined-basic"
        label="Sarch for id"
        variant="outlined"
        type="number"
        value={term}
        onChange={onInputChange}
      />

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
              {console.log(rows)}

              {console.log("zawartosc term=" + term)}
              {rows
                // .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)

                .map((row: any) => {
                  return (
                    <TableRow
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
    </>
  );
};

export default TableColor;
