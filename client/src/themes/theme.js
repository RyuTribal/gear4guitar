import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

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
    background:{
      default: "#262725",
    },
    error: {
      main: "#f44336",
    },
  },
  typography: {},
  spacing: 10,
});

theme.spacing(2);

export default theme;
