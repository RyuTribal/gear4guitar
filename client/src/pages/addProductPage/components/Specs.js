import {
  TextField,
  Box,
  Typography,
  Button,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function Specs(props) {
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
        Specs
      </Typography>
      {props.specs.map((spec, index) => (
        <Box
          key={index}
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <TextField
            value={spec.title}
            onChange={(e) => {
              props.setSpecs(
                props.specs.map((spec, i) => {
                  if (i === index) {
                    return { ...spec, title: e.target.value };
                  }
                  return spec;
                })
              );
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      props.setSpecs(
                        props.specs.filter((spec, i) => i !== index)
                      )
                    }
                  >
                    <RemoveCircleIcon color="error" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label={`Spec section ${index + 1}`}
            variant="outlined"
            fullWidth
          />
          {spec.content.map((content, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "90%",
                marginLeft: "auto",
                marginRight: "0",
              }}
            >
              <TextField
                value={content}
                onChange={(e) => {
                  props.setSpecs(
                    props.specs.map((spec, spec_index) => {
                      if (spec_index === index) {
                        return {
                          ...spec,
                          content: spec.content.map(
                            (content, content_index) => {
                              if (i === content_index) {
                                return e.target.value;
                              }
                              return content;
                            }
                          ),
                        };
                      }
                      return spec;
                    })
                  );
                }}
                InputProps={
                  spec.content.length > 1 && {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            props.setSpecs(
                              props.specs.map((spec, spec_index) => {
                                if (spec_index === index) {
                                  return {
                                    ...spec,
                                    content: spec.content.filter(
                                      (content, content_index) => i !== content_index
                                    ),
                                  };
                                }
                                return spec;
                              })
                            )
                          }
                        >
                          <RemoveCircleIcon color="error" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                }
                label={`Bullet point ${i + 1}`}
                variant="outlined"
                fullWidth
              />
            </Box>
          ))}
          <Button
            onClick={() => {
              props.setSpecs(
                props.specs.map((spec, i) => {
                  if (i === index) {
                    return {
                      ...spec,
                      content: [...spec.content, ""],
                    };
                  }
                  return spec;
                })
              );
            }}
          >
            Add bullet point
          </Button>
          {index !== props.specs.length - 1 && <Divider />}
        </Box>
      ))}
      <Button
        onClick={() =>
          props.setSpecs([...props.specs, { title: "", content: [""] }])
        }
      >
        Add spec section
      </Button>
    </Box>
  );
}
