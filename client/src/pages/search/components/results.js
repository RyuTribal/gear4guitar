import { Box, Typography } from "@mui/material";
import React from "react";

function render(search_results) {
    if (!search_results || search_results.length === 0) {
        return (
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', padding: '10px 30px' }}>
                <Typography>No Bitches?</Typography>
            </Box>
        )
    } else {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                {search_results.map((result, index) => (
                    <Box flexBasis={0} flexShrink={1} flexGrow={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px 0px', border: '1px solid rgba(0, 0, 0, 0.3)' }}>
                        <Typography key={index} >{result.title}</Typography>
                    </Box>
                ))}
            </Box>
        )
    }
}

export default function Results(props) {
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ display: 'flex', width: '100%' }}>
                {render(props.search_results.data)}
            </Box>
        </Box>
    )
}
