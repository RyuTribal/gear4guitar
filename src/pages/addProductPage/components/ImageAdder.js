import {
  Tooltip,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function ImageAdder(props) {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "40%" },
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography textAlign="center" variant="h5" component="h2" gutterBottom>
        Images
      </Typography>
      {props.images.map((image, index) => (
        <Tooltip key={index} title="Add an image link to the product">
          <TextField
            value={image}
            onChange={(e) => {
              props.setImages(
                props.images.map((image, i) => {
                  if (i === index) {
                    return e.target.value;
                  }
                  return image;
                })
              );
            }}
            InputProps={
              props.images.length > 1 && {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        props.setImages(
                          props.images.filter((image, i) => i !== index)
                        )
                      }
                    >
                      <RemoveCircleIcon color="error" />
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }
            label={index === 0 ? `Thumbnail image` : `Extra image ${index}`}
            variant="outlined"
            fullWidth
          />
        </Tooltip>
      ))}
      <Button onClick={() => props.setImages([...props.images, ""])}>
        Add image link
      </Button>
    </Box>
  );
}
