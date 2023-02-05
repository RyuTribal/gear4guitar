import { Box, Typography, Button } from "@mui/material";
import React from "react";
import TextField from '@mui/material/TextField';

function render(results, buttonFunction) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center", width: "70%" }} >
            <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: "flex", flexDirection: "column", padding: "20px 20px" }} >
                <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: "flex", flexDirection: "column", padding: "20px 20px" }} >
                    <Typography >
                        test
                    </Typography>

                    <form onSubmit={buttonFunction()}>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={buttonFunction}  required />
                        <Button type='submit'>Submit</Button>
                    </form>

                    
                </Box>
            </Box>
        </Box>
    );
}

export default function Results(props) {
    return (
        <Box sx={{ display: "flex", width: "100%" }}>
            <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%", }} >
                    {render(props.results.data, props.buttonFunction)}
                </Box>
            </Box>
        </Box>
    );
}

/*
<TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    <Button type='submit'>Submit</Button>
*/