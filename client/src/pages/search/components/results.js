import { Box, Typography } from "@mui/material";
import React from "react";

export default function Results(props) {
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ display: 'flex', width: '100%' }}>
                {props.results.data.map((result, index) => (
                    <Box sx={{ display: 'flex', border: 'none' }}>
                        <Typography>Test</Typography>
                        <Typography>{result[index].title}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
