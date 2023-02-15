import React from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  TextField,
  Autocomplete,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import list_of_countries from "./list_of_countries";
import useWindowSize from "../../../redundant_functions/WindowSize";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.text.third,
  },
}));

export default function RenderAddress(props) {
  const size = useWindowSize();
  let country_names = [];
  list_of_countries().map((country) => country_names.push(country.name));
  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {size.width <= 851 && (
          <Box>
            <Typography variant="h5">Placing Order</Typography>
            <Divider sx={{ backgroundColor: "text.primary" }} />
          </Box>
        )}

        <Typography variant="h6">Reciever information</Typography>
        <StyledTextField
          label="First name"
          variant="outlined"
          value={props.address.first_name}
          onChange={(e) =>
            props.setAddress({ ...props.address, first_name: e.target.value })
          }
        />
        <StyledTextField
          label="Last name"
          variant="outlined"
          value={props.address.last_name}
          onChange={(e) =>
            props.setAddress({ ...props.address, last_name: e.target.value })
          }
        />
        <StyledTextField
          label="Email"
          variant="outlined"
          value={props.address.email}
          onChange={(e) =>
            props.setAddress({ ...props.address, email: e.target.value })
          }
        />
        <Divider sx={{ backgroundColor: "text.primary" }} />
        <Typography variant="h6">Shipping address</Typography>
        <StyledTextField
          label="Street"
          variant="outlined"
          value={props.address.street}
          onChange={(e) =>
            props.setAddress({ ...props.address, street: e.target.value })
          }
        />
        <StyledTextField
          label="House number/Apartment number"
          variant="outlined"
          value={props.address.number}
          onChange={(e) =>
            props.setAddress({ ...props.address, number: e.target.value })
          }
        />
        <StyledTextField
          label="City"
          variant="outlined"
          value={props.address.city}
          onChange={(e) =>
            props.setAddress({ ...props.address, city: e.target.value })
          }
        />
        <StyledTextField
          label="Zip code"
          variant="outlined"
          value={props.address.zip}
          onChange={(e) =>
            props.setAddress({ ...props.address, zip: e.target.value })
          }
        />
        <Autocomplete
          label="Country"
          variant="outlined"
          options={country_names}
          value={props.address.country}
          renderInput={(params) => (
            <StyledTextField
              value={props.address.country}
              onChange={(e) => {
                props.setAddress({ ...props.address, country: e.target.value });
              }}
              {...params}
              label="Country"
              sx={{
                "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
                  backgroundColor: "secondary.main",
                },
              }}
            />
          )}
        />
        <Divider sx={{ backgroundColor: "text.primary" }} />
        <Typography variant="h6">Payment method</Typography>
        <RadioGroup
          aria-labelby="payment_method"
          defaultValue="card"
          name="payment_method"
          sx={{ color: "text.primary" }}
        >
          <FormControlLabel value="card" control={<Radio />} label="Card" />
          <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
          <FormControlLabel
            value="giftcard"
            control={<Radio />}
            label="Gift card"
          />
          <FormControlLabel
            value="invoice"
            control={<Radio />}
            label="Invoice"
          />
        </RadioGroup>
      </Box>
    </Grid>
  );
}
