import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  overrides: {
    MuiButtonBase: {
      root: {
        color: "white !important",
      },
    },
  },
  palette: {
    primary: {
      main: "#ffb800",
    },
    secondary: {
      main: "#101110",
    },
    text: {
      primary: "#d1cfcf",
      secondary: "#d1cfcf",
      third: "#F8F5FA",
    },
    background: {
      default: "#262725",
    },
    error: {
      main: "#f44336",
    },
  },
  typography: {
    root: { color: "#d1cfcf" },
    h3: { color: "#ffb800" },
    h4: { color: "#d1cfcf" },
    h5: { color: "#d1cfcf" },
    subtitle1: { color: "#d1cfcf" },
    subtitle2: { color: "#d1cfcf" },
    subtitle: { color: "#d1cfcf" },
  },
  spacing: 10,
});

theme.spacing(2);

export default theme;
