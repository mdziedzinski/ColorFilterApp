import React, { useState, useEffect, ChangeEvent } from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { colors, lighten } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { query } from "express";
import { JsxFlags } from "typescript";

const TableColor = () => {
  const [colorsFirstPage, setColorsFirstPage] = useState<any>([]);
  const [colorsSecondPage, setColorsSecondPage] = useState<any>([]);
  const [colorsData, setColorsData] = useState<any>([]);

  const [term, setTerm] = useState<string>("");

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTerm(value);
    console.log(term);
  };

  // useEffect(() => {
  //   Promise.all([
  //     fetch("https://reqres.in/api/products?page=1"),
  //     fetch("https://reqres.in/api/products?page=2"),
  //   ])
  //     .then(([resFirstPage, resSecondPage]) =>
  //       Promise.all([resFirstPage.json(), resSecondPage.json()])
  //     )
  //     .then(([dataFirstPage, dataSecondPage]) => {
  //       setColorsFirstPage(dataFirstPage.data);
  //       setColorsSecondPage(dataSecondPage.data);
  //       setColorsData(dataFirstPage.data.concat(dataSecondPage.data));
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //       console.log("errory");
  //     });
  // }, []);

  useEffect(() => {
    const fetchColors = async () => {
      const res = await axios.get(`https://reqres.in/api/products?id=${term}`);
      if (term) {
        setColorsData([res.data.data]);
      } else {
        setColorsData(res.data.data);
      }
    };
    fetchColors();
  }, [term]);

  console.log("to jest colors data");
  console.log(colorsData);

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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // console.log(colors && colors);
  // console.log(colorsData);

  const rows = colorsData;
  return (
    <>
      <TextField
        sx={{ m: "2rem" }}
        id="outlined-basic"
        label="Sarch for id"
        variant="outlined"
        type="string"
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
              {console.log(Array.isArray(rows))}
              {console.log("zawartosc term=" + term)}
              {rows // .filter((row: any) => row.id.toString().includes(term))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default TableColor;
