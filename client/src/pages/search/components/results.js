import { Box, Typography, Button } from "@mui/material";
import React from "react";
import SkeletonText from "./skeleton";

function render(search_results, buttonFunction) {
    if (!search_results || search_results.length === 0) {
        return (
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', padding: '10px 30px' }}>
                <SkeletonText />
            </Box>
        )
    } else {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'flex-start', justifyContent: 'flex-start ', width: '70%' }}>
                {search_results.map((result) => (
                    <Box component={'button'} onClick={() => buttonFunction(result.id)} sx={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start', flexDirection: 'row', padding: '20px 20px', cursor: 'pointer', border: '1px solid rgba(0, 0, 0, 0.3)' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '20px 20px', justifyContent: 'flex-start', alignContent: 'flex-start' }}>
                            <Box component="img" src={result.images[0]} alt="image" width={100} height={100} />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '20px 20px', justifyContent: 'flex-start', alignContent: 'flex-start' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start' }}>
                                <Typography variant="h6" sx={{ color: '#434649' }} >{result.title}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start' }}>
                                <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d00000' }} >{result.price} kr</Typography>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        )
    }
}

export default function Results(props) {
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-evenly', width: '100%' }}>
                {render(props.search_results.data, props.buttonFunction)}
            </Box>
        </Box>
    )
}
