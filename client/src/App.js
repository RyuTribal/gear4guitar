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
import Product from "./pages/productPage/productPage";
import AddProduct from "./pages/addProductPage/addProductPage";
import EditProduct from "./pages/editProductPage/editProductPage";
import StorageChecker from "./pages/StorageChecker";
import ScrollToTop from "./pages/ScrollToTop";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Navbar />
        <ScrollToTop />
        <StorageChecker />
        <Box
          sx={{
            minHeight: "100%",
            maxWidth: "1251px",
            margin: "0 auto",
            marginTop: "2rem",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/" element={<Search />}>
              <Route path=":category" element={<Search />} />
            </Route>
            <Route path="/sign_in" element={<SignIn />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/productPage/:id" element={<Product />} />
            <Route path="/add_product" element={<AddProduct />} />
            <Route path="/edit_product/:id" element={<EditProduct />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;

// Client = npm start
// Server = npm run dev
