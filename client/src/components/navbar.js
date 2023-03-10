import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  ButtonBase,
  Button,
  IconButton,
  Badge,
  Backdrop,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import logo_mobile from "./images/logo_small.png";
import theme from "../themes/theme";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TuneIcon from "@mui/icons-material/Tune";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import useWindowSize from "../redundant_functions/WindowSize";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LoginIcon from "@mui/icons-material/Login";
import withRouter from "./routes";
import Cart from "./cart";

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

const ADMIN_ACTIONS = [
  { icon: <SpeedDialIcon />, name: "Add Product", link: "/add_product" },
  { icon: <TuneIcon />, name: "Edit Orders", link: "/edit_orders" },
];

function SearchAppBar(props) {
  const size = useWindowSize();
  const [token, setToken] = React.useState(null);
  const [basket, setBasket] = React.useState([]);
  const [admin, setAdmin] = React.useState(false);
  const [speed_dial_open, setSpeedDialOpen] = React.useState(false);
  const [searchbar, setSearchbar] = React.useState(false);
  const [openCart, setOpenCart] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  let token_state = useSelector((state) => state.jwtReducer.jwt_token);
  let basket_state = useSelector((state) => state.basketReducer.basket);
  let admin_state = useSelector((state) => state.jwtReducer.isAdmin);
  React.useEffect(() => {
    setToken(token_state);
  }, [token_state]);
  React.useEffect(() => {
    setBasket(basket_state);
  }, [basket_state]);
  React.useEffect(() => {
    setAdmin(admin_state);
  }, [admin_state]);

  const handleSearch = (search_term) => {
    if (props.router.location.pathname.includes("/search")) {
      let params = new URLSearchParams(props.router.location.search);
      let query_string = "?";
      for (let param of params.entries()) {
        if (param[0] === "query") {
          continue;
        }
        if (query_string[query_string.length - 1] !== "?") {
          query_string += "&";
        }
        query_string += `${param[0]}=${param[1]}`;
      }
      if (search_term === "" || !search_term) {
        props.navigate(`${props.router.location.pathname}${query_string}`);
      } else {
        props.router.navigate(
          `${props.router.location.pathname}${query_string}&query=${search_term}`
        );
      }
    } else {
      if (search_term === "" || !search_term) {
        props.router.navigate(`/search`);
        return;
      }
      props.router.navigate(`/search?query=${search_term}`);
    }
  };
  const handleOpenClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenCart(true);
  };

  const handleCartClick = () => {
    setOpenCart(false);
  };
  const [query, setValue] = React.useState("");
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar
        sx={{
          background: theme.palette.secondary.main,
          color: "text.primary",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px 10px",
        }}
        position="fixed"
      >
        {searchbar && size.width <= 851 ? (
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={() => setSearchbar(false)}
            >
              <ChevronLeftIcon color="inherit" />
            </IconButton>
            <Search sx={{ borderRadius: "10px" }}>
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
          </Toolbar>
        ) : (
          <Toolbar sx={{ maxWidth: "1251px", width: "100%" }}>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <ButtonBase to="/" component={Link}>
                <Box
                  component="img"
                  sx={{
                    objectFit: "contain",
                    maxWidth: size.width > 851 ? "256px" : "5rem",
                  }}
                  alt="Company logo"
                  src={size.width > 851 ? logo : logo_mobile}
                ></Box>
              </ButtonBase>
            </Box>
            {size.width > 851 && (
              <Box
                sx={{
                  flexGrow: 3,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
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
                  onClick={() => handleSearch(query)}
                >
                  Find guitar
                </Button>
              </Box>
            )}

            <Box
              sx={{
                gap: 5,
                flexGrow: 2,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {size.width < 851 && (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="search"
                  onClick={() => setSearchbar(true)}
                >
                  <SearchIcon />
                </IconButton>
              )}
              {admin && size.width > 851 && (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="addProduct"
                  component={Link}
                  to="/add_product"
                >
                  <Badge>
                    <AddBoxIcon />
                  </Badge>
                </IconButton>
              )}
              {admin && size.width > 851 && (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="editOrders"
                  component={Link}
                  to="/edit_orders"
                >
                  <Badge>
                    <TuneIcon />
                  </Badge>
                </IconButton>
              )}
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="cart"
                id="cart-button"
                aria-controls={openCart ? "cart-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openCart ? "true" : undefined}
                onClick={handleOpenClick}
              >
                <Badge badgeContent={basket ? basket.length : 0} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <Cart
                open={openCart}
                anchorEl={anchorEl}
                setOpen={(isOpen) => handleCartClick(isOpen)}
                user={token}
              />
              {token ? (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="account"
                  component={Link}
                  to="/account"
                >
                  <PersonIcon />
                </IconButton>
              ) : size.width > 851 ? (
                <Button variant="contained" component={Link} to="/sign_in">
                  Sign in
                </Button>
              ) : (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="login"
                  component={Link}
                  to="/sign_in"
                >
                  <LoginIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        )}
      </AppBar>
      {size.width <= 851 && admin && (
        <Box>
          <Backdrop sx={{ zIndex: 999 }} open={speed_dial_open} />
          <SpeedDial
            ariaLabel="admin menu"
            sx={{ position: "fixed", bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            onClose={() => setSpeedDialOpen(false)}
            onOpen={() => setSpeedDialOpen(true)}
            open={speed_dial_open}
          >
            {ADMIN_ACTIONS.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                component={Link}
                to={action.link}
                onClick={() => setSpeedDialOpen(false)}
              />
            ))}
          </SpeedDial>
        </Box>
      )}
    </Box>
  );
}

export default withRouter(SearchAppBar);
