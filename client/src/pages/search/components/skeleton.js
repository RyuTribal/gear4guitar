import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box } from "@mui/material";

export default function SkeletonText(props) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'flex-start', justifyContent: 'flex-start ', width: '70%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start', flexDirection: 'row', padding: '20px 20px', cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', padding: '20px 20px', justifyContent: 'flex-start', alignContent: 'flex-start' }}>
                    <Skeleton variant='text' width={1400} height={200}></Skeleton>
                </Box>
            </Box>
        </Box>
    )
}
