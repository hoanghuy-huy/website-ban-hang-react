import * as React from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { handleCloseSnackBar } from '~/redux/features/cartSlice';

export default function SnackbarComp({message, show, setShow}) {
    const [state, setState] = React.useState({
        vertical: 'bottom',
        horizontal: 'center',
    });

    const { vertical, horizontal } = state;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShow(false);
    };

    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={show}
                onClose={handleClose}
                message={message ? message : "Số lượng được mua tối đa của sản phẩm này là 10"}
                key={vertical + horizontal}
                autoHideDuration={3000}
            />
        </Box>
    );
}
