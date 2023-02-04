import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box, Typography } from "@mui/material";

export default function SkeletonText(props) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', width: '70%' }}>
            <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'row', padding: '20px 20px' }}>
                <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '20px 20px' }}>
                    <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '20px 20px' }}>
                        <Skeleton variant='text' ></Skeleton>
                    </Box>
                    <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '20px 20px' }}>
                        <Skeleton variant='text' width={600} height={600} ></Skeleton>
                    </Box>
                    <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '20px 20px' }}>
                        <Skeleton variant='text' ></Skeleton>
                        <Skeleton variant='text' ></Skeleton>
                    </Box>
                    <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '20px 20px' }}>
                        <Skeleton variant='text' ></Skeleton>
                        <Skeleton variant='text' ></Skeleton>
                    </Box>
                </Box>
                <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '20px 20px' }}>
                    <Box flexBasis={0} flexShrink={1} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', padding: '20px 20px' }}>
                        <Skeleton variant='text' ></Skeleton>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
