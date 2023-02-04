
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { ButtonBase, Button, IconButton, Badge } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import theme from "../themes/theme";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  borderRadius: "10px 0px 0px 10px",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function SearchAppBar() {
  const history = useNavigate();
  const [user, setUser] = React.useState(null);
  if (localStorage.getItem("user") !== null) {
    setUser(JSON.parse(localStorage.getItem("user")));
  }

  const handleSearch = (query) => {
    history({
      pathname: `/search/${query}`,
      state: { argument: query },
    });
  };
  const [query, setValue] = React.useState("");
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar
        sx={{ background: theme.palette.secondary.main, color: "text.primary" }}
        position="static"
      >
        <Toolbar>
          <Box
            sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}
          >
            <ButtonBase to="/" component={Link}>
              <Box
                component="img"
                sx={{
                  objectFit: "contain",
                  maxWidth: "256px",
                }}
                alt="Company logo"
                src={logo}
              ></Box>
            </ButtonBase>
          </Box>
          <Box sx={{ flexGrow: 3, display: "flex", justifyContent: "center" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(value) => setValue(value.target.value)}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onKeyDown={(e) => {
                  if (e.code === "Enter") {
                    handleSearch(query);
                  }
                }}
              />
            </Search>
            <Button
              sx={{ borderRadius: "0px 10px 10px 0px" }}
              variant="contained"
            >
              Find guitar
            </Button>
          </Box>
          <Box
            sx={{
              gap: 5,
              flexGrow: 2,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="cart"
            >
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {user ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="account"
              ></IconButton>
            ) : (
              <Button variant="contained" component={Link} to="/sign_in">
                Sign in
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
