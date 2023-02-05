import { Box, Button, ButtonBase, Grid, Typography } from "@mui/material";
import electric from "../images/electric.png";
import acoustic from "../images/acoustic.png";
import ukulele from "../images/ukulele.png";
import {Link} from 'react-router-dom'

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
          minHeight: "50vh",
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
          minHeight: "30vh"
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
      <Grid sx={{padding: "10px", height: "fit-content"}} item container xs={12} spacing={1}>
        <Grid item xs={12}>
          <Typography sx={{fontSize: "1.5rem", color: "text.primary"}} textAlign="center">
            BEST SELLERS
          </Typography>
        </Grid>
        <Grid sx={{height: "100%"}} item xs={12} container spacing={1}>
        {props.products.map((product, index) => (
          <Grid key={index} item md={3} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "secondary.main",
                  textDecoration: "none"
                }}
                component={Link}
                to={`/productPage/${product.id}`}
              >
                <Box
                  sx={{ flexGrow: 4 }}
                  component="img"
                  src={product.images[0]}
                />

                <Box sx={{ flexGrow: 1, flexShring: 1, flexBasis: 0, padding: "10px", display: "flex", gap: "5px", flexDirection: "column" }}>
                  <Typography sx={{fontSize: "1.2rem", color: "text.primary"}}>{product.title.length <= 18 ? product.title: (product.title.substr(0, 24) + "...")}</Typography>
                  <Typography sx={{fontSize: "1rem", color: "primary.main" }}>
                    {Math.round(product.price)} SEK
                  </Typography>
                </Box>
              </Box>
          </Grid>
        ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
