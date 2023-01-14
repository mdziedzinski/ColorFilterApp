import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const TableColor = () => {
  const [colors, setColors] = useState<any>(null);

  useEffect(() => {
    fetch("https://reqres.in/api/products")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setColors(data.data);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },

    {
      field: "year",
      headerName: "Year",
      type: "number",
      width: 110,
      editable: true,
    },
  ];

  const rows = [{ id: 1, name: "Snow", year: "Jon" }];

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={colors.data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>

      {colors &&
        colors.map((item: any) => {
          return <li></li>;
        })}
    </>
  );
};

export default TableColor;
