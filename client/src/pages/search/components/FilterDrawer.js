import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TextField,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import React from "react";
import MobileDrawer from "../../../components/mobileDrawer";
import useWindowSize from "../../../redundant_functions/WindowSize";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.text.third,
  },
}));

function handleSubmit(event, colors, brands, props) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  let form_data = {};
  form_data.price_min = data.get("price_min");
  form_data.price_max = data.get("price_max");
  form_data.colors = colors;
  form_data.brands = brands;
  props.onFilterChange(form_data);
}

function FilterRender(props) {
  const [price_min, setPriceMin] = React.useState(props.price_min);
  const [price_max, setPriceMax] = React.useState(props.price_max);
  const colors = props.checked_colors;
  const brands = props.checked_brands;
  return (
    <Box role="presentation" sx={{ width: "100%", height: "100%" }}>
      <Typography sx={{ color: "text.third" }} variant="h5">
        Filter
      </Typography>
      <Box
        noValidate
        component="form"
        onSubmit={(e) => {
          handleSubmit(e, colors, brands, props);
        }}
      >
        <Accordion
          sx={{ width: "100%", borderColor: "text.third" }}
          PaperProps={{
            sx: { padding: 0, paddingBottom: "40px" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "text.third" }} />}
            aria-controls="price-filter-content"
            id="price-filter-header"
            sx={{ backgroundColor: "secondary.main", width: "100%" }}
          >
            <Typography sx={{ color: "text.third" }} variant="h6">
              Price range
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "10px",
              backgroundColor: "secondary.main",
            }}
          >
            <StyledTextField
              variant="outlined"
              type="number"
              label="Min"
              id="price_min"
              name="price_min"
              value={price_min}
              onChange={(e) => {
                setPriceMin(e.target.value);
              }}
            />
            <Typography
              sx={{
                verticalAlign: "middle",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              variant="span"
            >
              -
            </Typography>
            <StyledTextField
              variant="outlined"
              type="number"
              id="price_max"
              name="price_max"
              onChange={(e) => {
                setPriceMax(e.target.value);
              }}
              sx={{ width: "100%", borderColor: "text.third" }}
              label="Max"
              value={price_max}
            />
          </AccordionDetails>
        </Accordion>
        <Divider sx={{ backgroundColor: "text.third", width: "100%" }} />
        <Accordion
          sx={{
            width: "100%",
            borderColor: "text.third",
            maxHeight: "500px",
            overflow: "auto",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "text.third" }} />}
            aria-controls="brands-filter-content"
            id="brands-filter-header"
            sx={{ backgroundColor: "secondary.main", width: "100%" }}
          >
            <Typography sx={{ color: "text.third" }} variant="h6">
              Brands
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "secondary.main",
            }}
          >
            {props.brands &&
              props.brands.map((brand) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      key={brand}
                      label={brand}
                      onChange={(e) => {
                        if (e.target.checked) {
                          brands.push(brand);
                        } else {
                          brands.splice(brands.indexOf(brand), 1);
                        }
                      }}
                      defaultChecked={
                        props.checked_brands &&
                        props.checked_brands.includes(brand)
                      }
                    />
                  }
                  label={brand}
                />
              ))}
          </AccordionDetails>
        </Accordion>
        <Divider sx={{ backgroundColor: "text.third", width: "100%" }} />
        <Accordion
          sx={{
            maxHeight: "500px",
            overflow: "auto",
            width: "100%",
            borderColor: "text.third",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "text.third" }} />}
            aria-controls="colors-filter-content"
            id="colors-filter-header"
            sx={{ backgroundColor: "secondary.main", width: "100%" }}
          >
            <Typography sx={{ color: "text.third" }} variant="h6">
              Colors
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "secondary.main",
            }}
          >
            {props.colors &&
              props.colors.map((color) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      key={color}
                      label={color}
                      onChange={(e) => {
                        if (e.target.checked) {
                          colors.push(color);
                        } else {
                          colors.splice(colors.indexOf(color), 1);
                        }
                      }}
                      defaultChecked={
                        props.checked_colors &&
                        props.checked_colors.includes(color)
                      }
                    />
                  }
                  label={color}
                />
              ))}
          </AccordionDetails>
        </Accordion>
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "100%", marginTop: "20px" }}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
}

export default function FilterDrawer(props) {
  const size = useWindowSize();

  if (size.width > 851) {
    return <FilterRender {...props} />;
  } else {
    return (
      <MobileDrawer
        open={size.width > 851 || props.open}
        onClose={props.onClose}
        side="left"
        onOpen={props.onOpen}
        PaperProps={{
          sx: {
            width: "80%",
            padding: "20px",
            backgroundColor: "secondary.main",
          },
        }}
      >
        <FilterRender {...props} />
      </MobileDrawer>
    );
  }
}
