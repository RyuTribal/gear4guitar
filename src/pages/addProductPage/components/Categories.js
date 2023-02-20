import { Tooltip, Box, TextField, Button, Breadcrumbs, Typography } from "@mui/material";

export default function Categories(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        width: { xs: "100%", sm: "40%" },
      }}
    >
      <Tooltip title="The category of the product">
        <TextField
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              if (e.target.value.length > 1) {
                props.setCategories([...props.categories, e.target.value]);
                e.target.value = "";
              }
            }
          }}
          label="Category"
          variant="outlined"
          fullWidth
        />
      </Tooltip>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {props.categories.map((category, index) => (
          <Typography key={index} variant="subtitle">
            {category}
          </Typography>
        ))}
      </Breadcrumbs>
      <Button color="error" onClick={() => props.setCategories([])}>
        Clear
      </Button>
    </Box>
  );
}
