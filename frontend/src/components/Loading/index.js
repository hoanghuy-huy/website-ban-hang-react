import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Loading = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', backgroundColor: '#fff' }}>
            <CircularProgress sx={{ height: '200vh', width: 100 }} />
        </Box>
    );
};

export default Loading;
