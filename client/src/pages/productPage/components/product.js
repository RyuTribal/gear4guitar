import { Box, Typography, Button, Input } from "@mui/material";
import React from "react";
import { List, ListItem } from '@mui/material';
import SkeletonText from "./skeleton";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    padding: 10,
    borderRadius: 4,
    border: '1px solid #989898',
}));

function convertJSON_toIslam(json) {
    const islam = JSON.parse(json);
    return islam;
}

function render(results, buttonFunction, submit, comment, setValue) {
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
                                <List sx={{ listStyleType: 'disc', pl: 6 }}>
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
                <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '20px 20px' }}>
                    <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '20px 20px' }}>
                        <StyledInputBase
                            onChange={(value) => setValue(value.target.value)}
                            placeholder="Comment"
                            inputProps={{ 'aria-label': 'comment' }}
                            onKeyDown={(e) => {
                                if (e.code === 'Enter') {
                                    submit(comment)
                                }
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        )
    }
}

function renderComment(comments) {
    if (!comments || comments.length === 0) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', width: '70%' }}>
                <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'row', padding: '20px 20px' }}>
                    <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '0px 0px 0px 20px' }}>
                        <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '0px 0px 0px 0px' }}>
                            <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h5" sx={{ color: '#434649' }} >No comments</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    } else {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', width: '70%' }}>
                {comments.map((comment) => (
                    <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'row', padding: '20px 20px' }}>
                        <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '0px 0px 0px 20px' }}>
                            <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '0px 0px 0px 0px' }}>
                                <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography >{comment.comment}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        )
    }
}

export default function Results(props) {
    const [comment, setValue] = React.useState('');
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-evenly', width: '100%' }}>
                    {render(props.results.data, props.buttonFunction, props.submit, comment, setValue)}
                </Box>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-evenly', width: '100%' }}>
                    {renderComment(props.comments.data)}
                </Box>
            </Box>
        </Box>
    )
}
