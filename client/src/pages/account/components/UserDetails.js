import {
  Grid,
  Box,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import LoadingButton from "@mui/lab/LoadingButton";

export default function UserDetails(props) {
  return (
    <Grid item xs={12} md={6}>
      <Box
        component="form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          props.updateUser();
        }}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
          >
            <Typography variant="h6" gutterBottom>
              {`${props.user.first_name} ${props.user.last_name}'s Details`}
            </Typography>
            {props.user.is_admin && (
              <Tooltip title="Admin">
                <GavelIcon sx={{ color: "primary.main" }} />
              </Tooltip>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              fullWidth
              id="firstName"
              label="First Name"
              onChange={(e) => {
                props.updateState({
                  ...props.user,
                  first_name: e.target.value,
                });
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  props.updateUser();
                }
              }}
              value={props.user.first_name ? props.user.first_name : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              onChange={(e) => {
                props.updateState({
                  ...props.user,
                  last_name: e.target.value,
                });
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  props.updateUser();
                }
              }}
              value={props.user.last_name ? props.user.last_name : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => {
                props.updateState({
                  ...props.user,
                  email: e.target.value,
                });
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  props.updateUser();
                }
              }}
              value={props.user.email ? props.user.email : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={(e) => {
                props.updateState({
                  ...props.user,
                  password: e.target.value,
                });
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  props.updateUser();
                }
              }}
              value={props.user.password ? props.user.password : ""}
            />
          </Grid>
        </Grid>
        <LoadingButton
          loading={props.loading}
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          <span>Save</span>
        </LoadingButton>
      </Box>
    </Grid>
  );
}
