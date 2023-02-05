import { Box, Button, Grid, Typography } from "@mui/material";
import electric from "../images/electric.png";
import acoustic from "../images/acoustic.png";
import ukulele from "../images/ukulele.png";

export default function HomeView(props) {
  return (
    <Grid
      sx={{ height: "100%", width: "100%", margin: 0 }}
      container
      spacing={1}
    >
      <Grid
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(${electric})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          gap: "20px",
        }}
        item
        xs={12}
      >
        <Typography marginLeft={5} fontWeight="bold" variant="h3">
          Plug in, rock out
        </Typography>
        <Typography marginLeft={5} variant="h5">
          Elevate your sound with electric power.
        </Typography>
        <Box
          marginLeft={5}
          marginBottom={5}
          sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
        >
          <Button variant="contained">Electric Guitars</Button>
          <Button variant="contained">Accessories</Button>
        </Box>
      </Grid>
      <Grid
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(${acoustic})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          gap: "20px",
        }}
        item
        sm={6}
        xs={12}
      >
        <Typography marginLeft={5} fontWeight="bold" variant="h3">
          Strum natural, play pure.
        </Typography>
        <Typography marginLeft={5} variant="h5">
          Discover the timeless beauty of acoustic sound.
        </Typography>
        <Box
          marginLeft={5}
          marginBottom={5}
          sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
        >
          <Button variant="contained">Acoustic Guitars</Button>
          <Button variant="contained">Accessories</Button>
        </Box>
      </Grid>
      <Grid
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(${ukulele})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          gap: "20px",
        }}
        item
        xs={12}
        sm={6}
      >
        <Typography marginLeft={5} fontWeight="bold" variant="h3">
          Ukulele: a smile in every strum.
        </Typography>
        <Typography marginLeft={5} variant="h5">
          Bring happiness to your music with the ukulele.
        </Typography>
        <Box
          marginLeft={5}
          marginBottom={5}
          sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
        >
          <Button variant="contained">Ukuleles</Button>
          <Button variant="contained">Accessories</Button>
        </Box>
      </Grid>
      <Grid item container xs={12}>
        <Grid item xs={12}>
          <Typography variant="h4" textAlign="center">
            BEST SELLERS
          </Typography>
        </Grid>
        {props.products.map((product) => (
          <Grid item xs={3}></Grid>
        ))}
      </Grid>
    </Grid>
  );
}
