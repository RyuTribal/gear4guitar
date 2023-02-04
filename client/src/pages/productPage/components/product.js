import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { List, ListItem } from '@mui/material';
import SkeletonText from "./skeleton";

function convertJSON_toIslam(json) {
    const islam = JSON.parse(json);
    return islam;
}

function render(results, buttonFunction) {
    if (!results || results.length === 0) {
        return (
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', padding: '10px 30px' }}>
                <SkeletonText />
            </Box>
        )
    } else {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', width: '70%' }}>
                {results.map((result) => (
                    <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'row', padding: '20px 20px' }}>
                        <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '20px 20px' }}>
                            <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '20px 20px' }}>
                                <Typography variant="h4" sx={{ color: '#434649' }} >{result.title}</Typography>
                            </Box>
                            <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '20px 20px' }}>
                                <Box component="img" src={result.image} alt="image" width={600} height={600} />
                            </Box>
                            <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '20px 20px' }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }} >Description</Typography>
                                {convertJSON_toIslam(result.description).map((desc) => (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <Typography sx={{ fontWeight: 'bold' }}>{desc.title}</Typography>
                                        <Typography >{desc.content}</Typography>
                                        <br />
                                    </Box>
                                ))}
                            </Box>
                            <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '20px 20px' }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }} >Specifications</Typography>
                                <List sx={{ listStyleType: 'disc', pl: 6}}>
                                    {result.specs.map((spec) => (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            {spec["content"].map((item) => (
                                                <ListItem sx={{ display: 'list-item', paddingLeft: '0px' }}>{item}</ListItem>

                                            ))}
                                        </Box>
                                    ))}
                                </List>
                            </Box>
                        </Box>
                        <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '20px 20px' }}>
                            <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '20px 20px' }}>
                                <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d00000' }} >{result.price} kr</Typography>
                                <Button onClick={() => buttonFunction(result.id)} sx={{ fontSize: '1.5rem', fontWeight: 'bold', "&:hover": { backgroundColor: "#FA9600" }, backgroundColor: '#FA8600', color: 'white' }} >Add To Basket</Button>
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
                {render(props.results.data, props.buttonFunction)}
            </Box>
        </Box>
    )
}

/*
<Typography >{item}</Typography>
*/