import { Box, Typography, Button, TextField, Select, MenuItem, Tooltip, Container, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../../themes/theme";
import React, { useState } from "react";
import "react-multi-carousel/lib/styles.css";

let colors = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "honeydew", "hotpink", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgrey", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "100%",
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.text.third,
    },
}));

function checkNone(color) {
    if (color === "None") {
        return null;
    }
    return color;
}

function EditProductMain(props) {
    const [imageFields, setImageFields] = useState([
        { id: 0, value: "" }
    ]);

    const addImageField = () => {
        setImageFields([...imageFields, { id: imageFields.length, value: "" }]);
    };

    const handleImageChange = (event, id) => {
        const newImageFields = [...imageFields];
        newImageFields[id].value = event.target.value;
        setImageFields(newImageFields);
    };

    const resetImages = () => {
        setImageFields([{ id: 0, value: "" }]);
    };

    if (true) {
        return (
            <Container component="main" maxWidth="xs">
                <Paper sx={{ marginTop: 5, display: "flex", flexDirection: "column", alignItems: "center", background: theme.palette.secondary.main, padding: "20px" }} >
                    <Typography component="h1" variant="h5" sx={{ padding: '10px' }}>
                        Edit Product
                    </Typography>
                    <Box sx={{ display: "flex", width: "100%", flexDirection: "column", '& .MuiTextField-root': { m: 1 }, backgroundColor: '#101110' }} component="form" autoComplete="off" onSubmit={props.onSubmit}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Tooltip title="Product title (Max 255 characters)">
                                <StyledTextField
                                    label="Title"
                                    value={props.title}
                                    autoComplete="off"
                                    onChange={(event) => props.setTitle(event.target.value.substring(0, 255))}
                                />
                            </Tooltip>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Tooltip title="Product price in kr (Insert value between 0 - 1000000)">
                                <StyledTextField
                                    label="Price"
                                    type="number"
                                    inputProps={{ min: 0, max: 1000000 }}
                                    value={props.price}
                                    autoComplete="off"
                                    onChange={(event) => props.setPrice(event.target.value)}
                                />
                            </Tooltip>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Tooltip title="Product description">
                                <StyledTextField
                                    label="Description"
                                    value={props.description}
                                    autoComplete="off"
                                    onChange={(event) => props.setDescription(checkNone(event.target.value))}
                                />
                            </Tooltip>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Tooltip title="Product stock number (Insert value between 0 - 1000000)">
                                <StyledTextField
                                    label="In Stock"
                                    type="number"
                                    inputProps={{ min: 0, max: 1000000 }}
                                    value={props.in_stock}
                                    autoComplete="off"
                                    onChange={(event) => props.setInStock(event.target.value)}
                                />
                            </Tooltip>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", width: '25ch', padding: '10px' }}>
                            <Tooltip title="Product color">
                                <Select
                                    label="Color"
                                    value={props.color || "None"}
                                    autoComplete="off"
                                    onChange={(event) => props.setColor(event.target.value)}
                                >
                                    <MenuItem value="None">None</MenuItem>
                                    {colors.map(colorName => (
                                        <MenuItem key={colorName} value={colorName}>
                                            {colorName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Tooltip>
                        </Box>

                        {imageFields.map((field) => (
                            <Box key={field.id} sx={{ display: "flex", flexDirection: "column" }} component="form" >
                                <Tooltip title="Insert image link">
                                    <StyledTextField
                                        label="Image"
                                        value={field.value}
                                        autoComplete="off"
                                        onChange={(event) => handleImageChange(event, field.id)}
                                    />
                                </Tooltip>
                            </Box>
                        ))}

                        <Button onClick={addImageField} sx={{ mt: 3, mb: 2 }}>Add Image Field</Button>



                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Tooltip title="Product brand (Max 100 characters)">
                                <StyledTextField
                                    label="Brand"
                                    value={props.brand}
                                    autoComplete="off"
                                    onChange={(event) => props.setBrand(event.target.value.substring(0, 100))}
                                />
                            </Tooltip>
                        </Box>

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => { props.setImages(imageFields.map(field => field.value)); resetImages() }} >Submit</Button>

                    </Box>
                </Paper>
            </Container>
        );
    }
}

function Alert(props) {
    return (
        <Container component="main" maxWidth="xs">
            <Paper sx={{ marginTop: 5, display: "flex", flexDirection: "column", alignItems: "center", background: "green", padding: "5px" }} >
                <Typography component="h1" variant="h5" sx={{ padding: '10px' }}>
                    Product Edited
                </Typography>
            </Paper>
        </Container>
    )
}

export default function Results(props) {
    return (
        <Box sx={{ display: "flex", width: "100%", flexDirection: 'column' }}>
            {props.showAlert && (
                <Alert />
            )}
            <EditProductMain
                onSubmit={props.onSubmit}
                title={props.title}
                setTitle={props.setTitle}
                price={props.price}
                setPrice={props.setPrice}
                description={props.description}
                setDescription={props.setDescription}
                in_stock={props.in_stock}
                setInStock={props.setInStock}
                color={props.color}
                setColor={props.setColor}
                images={props.images}
                setImages={props.setImages}
                brand={props.brand}
                setBrand={props.setBrand}
            />
        </Box>
    );
}
