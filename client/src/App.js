
import Navbar from "./components/navbar";
import React from "react";
import Home from "./pages/home/home";
import Search from "./pages/search/search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin/SignIn";
import Registration from "./pages/registration/Registration";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import theme from "./themes/theme";
import Product from './pages/productPage/productPage';


function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            height: "100%",
          }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="/sign_in" element={<SignIn />} />
            <Route path="/register" element={<Registration />} />
            <Route path='/productPage/:id' element={<Product/>} />
          </Routes>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;

// Client = npm start
// Server = npm run dev
