import React from "react";
import {
  Grid,
  CircularProgress,
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  Tooltip,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import list_of_countries from "../../checkout/components/list_of_countries";

export default function OrderDetails(props) {
  const { order, status_list, is_loading } = props;
  let country_names = [];
  list_of_countries().map((country) => country_names.push(country.name));
  return (
    <Grid
      sx={{
        paddingTop: "20px",
      }}
      container
      spacing={2}
    >
      {is_loading && !order && (
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Grid>
      )}
      {order && (
        <React.Fragment>
          <Grid item xs={12}>
            <Typography
              sx={{ width: "100%", textAlign: "center" }}
              variant="h5"
              component="h2"
              gutterBottom
            >
              Order details for order: {order.id}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Tooltip title="Customer email (max 255 characters)">
              <TextField
                value={order.email}
                onChange={(e) => props.changeValue(e.target.value, "email")}
                label="Email"
                variant="outlined"
                fullWidth
              />
            </Tooltip>
          </Grid>
          <Grid item md={6} xs={12}>
            <Tooltip title="Customer first name (max 255 characters)">
              <TextField
                value={order.first_name}
                onChange={(e) =>
                  props.changeValue(e.target.value, "first_name")
                }
                label="First name"
                variant="outlined"
                fullWidth
              />
            </Tooltip>
          </Grid>
          <Grid item md={6} xs={12}>
            <Tooltip title="Customer last name (max 255 characters)">
              <TextField
                value={order.last_name}
                onChange={(e) => props.changeValue(e.target.value, "last_name")}
                label="Last name"
                variant="outlined"
                fullWidth
              />
            </Tooltip>
          </Grid>
          <Grid item xs={8}>
            <Tooltip title="Customer street name (max 255 characters)">
              <TextField
                value={order.street_name}
                onChange={(e) =>
                  props.changeValue(e.target.value, "street_name")
                }
                label="Street name"
                variant="outlined"
                fullWidth
              />
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title="Customer house number (max 255 characters)">
              <TextField
                value={order.house_number}
                onChange={(e) =>
                  props.changeValue(e.target.value, "house_number")
                }
                label="House number"
                variant="outlined"
                fullWidth
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Tooltip title="Customer city (max 255 characters)">
              <TextField
                value={order.city}
                onChange={(e) => props.changeValue(e.target.value, "city")}
                label="City"
                variant="outlined"
                fullWidth
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Tooltip title="Customer country (max 255 characters)">
              <Autocomplete
                label="Country"
                variant="outlined"
                options={country_names}
                value={order.country}
                renderInput={(params) => (
                  <TextField
                    value={order.country ? order.country : ""}
                    onChange={(e) =>
                      props.changeValue(e.target.value, "country")
                    }
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
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Tooltip title="Customer zip code (max 255 characters)">
              <TextField
                value={order.postal_code}
                onChange={(e) =>
                  props.changeValue(e.target.value, "postal_code")
                }
                label="Postal code"
                variant="outlined"
                type="number"
                fullWidth
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Tooltip title="Order status">
              <FormControl fullWidth>
                <InputLabel id="status_select_label">Order status</InputLabel>
                <Select
                  labelId="status_select_label"
                  id="status_select"
                  value={order.status}
                  label="Order status"
                  onChange={(e) => props.changeValue(e.target.value, "status")}
                >
                  {status_list.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              loading={is_loading}
              onClick={props.saveChanges}
              variant="contained"
            >
              Save changes
            </LoadingButton>
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
}
