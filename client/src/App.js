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
import AddProduct from "./pages/addProductPage/AddProductPage";
import EditProduct from "./pages/editProductPage/EditProductPage";
import StorageChecker from "./pages/StorageChecker";
import ScrollToTop from "./pages/ScrollToTop";
import Checkout from "./pages/checkout/checkout";
import { CssBaseline, Snackbar, Alert } from "@mui/material";
import Account from "./pages/account/account";
import NotFound from "./pages/not_found/NotFound";

function App() {
  const [snackbar, setSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const [snackbarDuration, setSnackbarDuration] = React.useState(3000);

  const showSnackBar = (snackbar, message, severity, duration) => {
    setSnackbar(snackbar);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarDuration(duration);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Snackbar
          open={snackbar}
          autoHideDuration={snackbarDuration}
          onClose={() => setSnackbar(false)}
        >
          <Alert onClose={() => setSnackbar(false)} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
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
            <Route
              path="/sign_in"
              element={
                <SignIn
                  showSnackBar={(snackbar) => {
                    showSnackBar(
                      true,
                      snackbar.message,
                      snackbar.severity,
                      snackbar.duration
                    );
                  }}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Registration
                  showSnackBar={(snackbar) => {
                    showSnackBar(
                      true,
                      snackbar.message,
                      snackbar.severity,
                      snackbar.duration
                    );
                  }}
                />
              }
            />
            <Route
              path="/productPage/:id"
              element={
                <Product
                  showSnackBar={(snackbar) => {
                    showSnackBar(
                      true,
                      snackbar.message,
                      snackbar.severity,
                      snackbar.duration
                    );
                  }}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <Checkout
                  showSnackBar={(snackbar) => {
                    showSnackBar(
                      true,
                      snackbar.message,
                      snackbar.severity,
                      snackbar.duration
                    );
                  }}
                />
              }
            />
            <Route
              path="/account"
              element={
                <Account
                  showSnackBar={(snackbar) => {
                    showSnackBar(
                      true,
                      snackbar.message,
                      snackbar.severity,
                      snackbar.duration
                    );
                  }}
                />
              }
            />
            <Route
              path="/add_product"
              element={
                <AddProduct
                  showSnackBar={(snackbar) => {
                    showSnackBar(
                      true,
                      snackbar.message,
                      snackbar.severity,
                      snackbar.duration
                    );
                  }}
                />
              }
            />
            <Route
              path="/edit_product/:id"
              element={
                <EditProduct
                  showSnackBar={(snackbar) => {
                    showSnackBar(
                      true,
                      snackbar.message,
                      snackbar.severity,
                      snackbar.duration
                    );
                  }}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;

// Client = npm start
// Server = npm run dev
