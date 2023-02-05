import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  overrides: {
    MuiTab: {
      root: {
        fontColor: "#f44336",
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
    },
    background: {
      default: "#262725",
    },
    error: {
      main: "#f44336",
    },
  },
  typography: {
    root: { color: "#d1cfcf"},
    h3: { color: "#ffb800"},
    h4: { color: "#d1cfcf"},
    h5: { color: "#d1cfcf"},
  },
  spacing: 10,
});

theme.spacing(2);

export default theme;
