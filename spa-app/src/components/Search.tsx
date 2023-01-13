import React, { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const Search = (): JSX.Element => {
  const [term, setTerm] = useState<string>("");
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);

    console.log(fetch("https://reqres.in/api/products"));
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
