import React from "react";
import {
  Breadcrumbs,
  Grid,
  Typography,
  Select,
  MenuItem,
  Button,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import MUILink from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useWindowSize from "../../../redundant_functions/WindowSize";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const MyIcon = (props) => {
  const { style, ...otherProps } = props;
  const colorStyle = {
    color: "#d1cfcf",
  };
  const styles = { ...style, ...colorStyle };
  return <ArrowDropDownIcon {...otherProps} style={styles} />;
};

function CreateResString(search_params) {
  let res_string = "";
  if (search_params) {
    if (search_params.direct_cat && search_params.brand) {
      let category = search_params.direct_cat.split(" ")[0];
      if (category.charAt(category.length - 1) !== "s") {
        category += "s";
      }
      res_string += category;
    } else if (search_params.direct_cat) {
      res_string += search_params.direct_cat;
    }
    if (search_params.brand) {
      res_string += " from " + search_params.brand;
    }
    if (res_string === "") {
      if (search_params.category) {
        res_string += search_params.category;
      } else if (search_params.indirect_cat) {
        res_string += search_params.indirect_cat;
      } else {
        res_string += "All Products";
      }
    }
    if (search_params.search_string) {
      res_string += ": " + search_params.search_string;
    }
  }
  return res_string;
}

export default function Header(props) {
  const size = useWindowSize();
  const { search_params } = props;
  const [sortBy, setSortBy] = React.useState(0);
  let res_string = CreateResString(search_params);
  return (
    <Grid spacing={2} item container xs={12}>
      {props.trail.length > 0 && (
        <Grid item xs={12}>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={0}
            indicatorColor="none"
            allowScrollButtonsMobile
            sx={{ borderBottom: "1px solid #e0e0e0" }}
            ScrollButtonComponent={(props) => {
              if (props.direction === "left" && !props.disabled) {
                return (
                  <IconButton {...props}>
                    <ChevronLeftIcon color="primary" />
                  </IconButton>
                );
              } else if (props.direction === "right" && !props.disabled) {
                return (
                  <IconButton {...props}>
                    <ChevronRightIcon color="primary" />
                  </IconButton>
                );
              } else {
                return null;
              }
            }}
          >
            {props.trail.map((item, index) => (
              <Tab
                key={index}
                label={item.category_name}
                component={Link}
                to={`/search/${item.id}`}
                value={index}
                sx={{
                  "&: hover": {
                    textDecoration: "underline",
                  },
                }}
              />
            ))}
          </Tabs>
        </Grid>
      )}
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <MUILink
            sx={{ height: "100%" }}
            color="inherit"
            component={Link}
            to="/"
          >
            <HomeIcon />
          </MUILink>
          {props.categories.map((category, index) => (
            <MUILink
              key={index}
              color="inherit"
              component={Link}
              to={"/search/" + category.id}
            >
              {category.category_name}
            </MUILink>
          ))}
        </Breadcrumbs>
      </Grid>
      <Grid
        container
        item
        sx={{ display: "flex", flexDirection: "row" }}
        xs={12}
        spacing={2}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: size.width > 851 ? "flex-start" : "center",
          }}
          item
          xs={12}
          md={6}
        >
          <Typography
            sx={{ color: "text.third", display: "flex", alignItems: "center" }}
            variant={size.width > 851 ? "h4" : "h6"}
            fontWeight="bold"
          >
            {res_string}
          </Typography>
          <Typography
            variant="subtitle"
            sx={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
          >
            ({props.matches} matches found)
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: size.width > 851 ? "flex-end" : "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {size.width > 851 ? (
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              variant="subtitle"
            >
              Sort by:
            </Typography>
          ) : (
            <Button
              onClick={() => {
                props.openFilterDrawer();
              }}
              variant="outlined"
              sx={{
                color: "text.primary",
                width: "100%",
                border: "1px solid #e0e0e0",
              }}
            >
              Filter
            </Button>
          )}

          <Select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              props.onChangeOrderBy(e.target.value);
            }}
            sx={{
              border: "1px solid #e0e0e0",
              marginLeft: size.width > 851 ? "10px" : "0px",
              color: "text.primary",
              width: size.width > 851 ? "200px" : "100%",
              fontSize: "0.875rem",
              fontWeight: "500",
              height: "auto",
              textAlign: "center",
              letterSpacing: "0.02857em",
              padding: "7.5px 15px !important",
            }}
            inputProps={{
              sx: {
                padding: size.width <= 851 && "0px !important",
              },
              MenuProps: {
                MenuListProps: {
                  sx: {
                    backgroundColor: "secondary.main",
                    "& .Mui-selected": {
                      backgroundColor: "background.default",
                    },
                    "& .MuiButtonBase-root:hover": {
                      backgroundColor: "background.default",
                    },
                  },
                },
              },
            }}
            IconComponent={size.width > 851 ? MyIcon : null}
          >
            {props.order_by.map((item, index) => (
              <MenuItem key={index} value={index}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </Grid>
  );
}
