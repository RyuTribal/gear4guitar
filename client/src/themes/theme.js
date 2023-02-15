import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  overrides: {
    MuiButtonBase: {
      root: {
        color: "white !important",
      },
    },
    MuiOutlinedInput: {
      "&:-webkit-autofill": {
        WebkitBoxShadow: "none",
      },
      "&:-internal-autofill-selected": {
        backgroundColor: "none",
      },
    },
    "&:-internal-autofill-selected": {
      backgroundColor: "none",
    },
  },
  components: {
    MuiInput: {
      MuiInputBase: {
        input: {
          "&:-internal-autofill-selected": {
            transitionDelay: "9999s",
            transitionProperty: "background-color, color",
          },
        },
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
      paper: "#101110",
    },
    divider: "#d1cfcf",
    error: {
      main: "#f44336",
    },
    action: {
      active: "#ffb800",
    },
  },
  typography: {
    root: { color: "#d1cfcf" },
    h3: { color: "#ffb800" },
    h4: { color: "#d1cfcf" },
    h5: { color: "#d1cfcf" },
    h6: { color: "#d1cfcf" },
    subtitle1: { color: "#d1cfcf" },
    subtitle2: { color: "#d1cfcf" },
    subtitle: { color: "#d1cfcf", opacity: "0.7" },
  },
  spacing: 10,
});

theme.spacing(2);

export default theme;
