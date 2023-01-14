import "./App.css";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Search from "./components/Search";
import TableColor from "./components/TableColor";

function App() {
  return (
    <>
      <main>
        {/* Hero unit */}
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
              <Search></Search>
              <TableColor></TableColor>
            </Typography>
          </Container>
        </Box>
      </main>
    </>
  );
}

export default App;
