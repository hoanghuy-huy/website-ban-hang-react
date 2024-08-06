import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import httpRequest from '~/utils/httpRequest';

export const addProductToCart = createAsyncThunk('cart/addProductToCart', async ({ productId, userId, quantity }) => {
    const res = await httpRequest.post('cart/add-product-to-cart', { productId, userId, quantity });
    if (res && res.EC === 0) {
        toast.success('Thêm vào giỏ hàng thành công');
        return res ? res.DT : [];
    } else {
        toast.error('Xảy ra lỗi vui lòng thử lại');
        return;
    }
});

export const getAllCart = createAsyncThunk('cart/getAllCart', async (userId) => {
    const res = await httpRequest.get(`cart/get-all?userId=${userId}`);

    return res ? res.DT : [];
});

export const changeQuantity = createAsyncThunk('cart/changeQuantity', async ({ userId, productId, quantity }) => {
    const res = await httpRequest.post(`cart/change-quantity`, { userId, productId, quantity });

    return res ? res.DT : [];
});

const initialState = {
    loading: false,
    error: false,
    cartList: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // add product to cart
            .addCase(addProductToCart.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            // get all product cart
            .addCase(getAllCart.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getAllCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.cartList = action.payload;
            })
            .addCase(getAllCart.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            // get all product cart
            .addCase(changeQuantity.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(changeQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
            })
            .addCase(changeQuantity.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            });
    },
});

export default cartSlice.reducer;
