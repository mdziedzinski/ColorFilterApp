import React, { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";

const Search = (): JSX.Element => {
  const [term, setTerm] = useState<string>("");

  const getSearchOptions = (value: string) => {
    fetch(`https://reqres.in/api/products/${value}`)
      .then((response) => response.json())
      .then((data) => console.log(data.data.name));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTerm(value);
    getSearchOptions(value);
  };
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
      {term}
    </>
  );
};

export default Search;
