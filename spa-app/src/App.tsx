import "./App.css";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import TableColor from "./components/TableColor";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";
import CoffeeTwoToneIcon from "@mui/icons-material/CoffeeTwoTone";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const [theme, setTheme] = useState<object>(darkTheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <main>
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              className="gradient-text"
              component="h1"
              variant="h2"
              align="center"
            >
              Hello, let's search.
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                setTheme(theme === darkTheme ? lightTheme : darkTheme);
              }}
            >
              Change theme to {theme === darkTheme ? "light " : "dark"}
            </Button>
            <TableColor />
          </Container>
        </main>
        <footer>
          <Link
            href="https://github.com/mdziedzinski"
            target="_blank"
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              marginTop: "2rem",
            }}
            color="inherit"
            underline="none"
          >
            Created with <CoffeeTwoToneIcon sx={{ marginInline: "5px" }} /> by
            Marcin Dziedziński
          </Link>
        </footer>
      </Box>
    </ThemeProvider>
  );
}

export default App;
