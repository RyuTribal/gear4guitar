import {
  Box,
  TextField,
  Select,
  MenuItem,
  Tooltip,
  InputLabel,
  FormControl,
} from "@mui/material";
import React from "react";
import "react-multi-carousel/lib/styles.css";

let colors = [
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "honeydew",
  "hotpink",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgrey",
  "lightgreen",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen",
];

export default function ProductBasic(props) {
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
      <Tooltip title="A title for the product (max 255 characters)">
        <TextField
          value={props.title}
          onChange={(e) => props.setTitle(e.target.value)}
          label="Title"
          variant="outlined"
          fullWidth
        />
      </Tooltip>
      <Tooltip title="A description for the product (max 255 characters)">
        <TextField
          value={props.description}
          onChange={(e) => props.setDescription(e.target.value)}
          multiline
          rows={4}
          label="Description"
          variant="outlined"
          fullWidth
        />
      </Tooltip>
      <Tooltip title="The price of the product (in SEK)">
        <TextField
          value={props.price}
          onChange={(e) => props.setPrice(e.target.value)}
          label="Price"
          variant="outlined"
          fullWidth
          type="number"
        />
      </Tooltip>
      <Tooltip title="Product brand">
        <TextField
          value={props.brand}
          onChange={(e) => props.setBrand(e.target.value)}
          label="Brand"
          variant="outlined"
          fullWidth
        />
      </Tooltip>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="test-select-label">Color</InputLabel>
        <Tooltip title="The color of the product">
          <Select
            value={props.color}
            onChange={(e) => props.setColor(e.target.value)}
            variant="outlined"
            fullWidth
          >
            {colors.map((color, index) => (
              <MenuItem key={index} value={color}>
                {color}
              </MenuItem>
            ))}
          </Select>
        </Tooltip>
      </FormControl>
      <Tooltip title="The amount of the product in stock">
        <TextField
          value={props.in_stock}
          onChange={(e) => props.setInStock(e.target.value)}
          label="Stock"
          variant="outlined"
          fullWidth
          type="number"
        />
      </Tooltip>
    </Box>
  );
}
