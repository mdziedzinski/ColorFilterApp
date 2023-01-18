import "./App.css";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import TableColor from "./components/TableColor";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Hello, let's search.
          <TableColor />
        </Typography>
      </Container>
    </Box>
  );
}

export default App;
