import * as React from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { handleCloseSnackBar } from '~/redux/features/cartSlice';

export default function SnackbarComp() {
    const { showSnackBar } = useSelector((state) => state.cart);
    const dispatch = useDispatch()
    const [state, setState] = React.useState({
        vertical: 'bottom',
        horizontal: 'center',
    });

    const { vertical, horizontal } = state;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(handleCloseSnackBar());
    };

    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={showSnackBar}
                onClose={handleClose}
                message="Số lượng được mua tối đa của sản phẩm này là 10"
                key={vertical + horizontal}
                autoHideDuration={3000}
            />
        </Box>
    );
}
