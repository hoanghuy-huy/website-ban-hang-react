import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import httpRequest from '~/utils/httpRequest';
import NProgress from 'nprogress';
import { useDispatch } from 'react-redux';

export const addProductToCart = createAsyncThunk('cart/addProductToCart', async ({ productId, userId, quantity },thunkAPI) => {
    const res = await httpRequest.post('cart/add-product-to-cart', { productId, userId, quantity });
    if (res && res.EC === 0) {
        toast.success('Thêm vào giỏ hàng thành công');
        thunkAPI.dispatch(fetchAllCart(userId))
        return res ? res.DT : [];
    } else {
        toast.error('Xảy ra lỗi vui lòng thử lại');
        return;
    }
});

export const fetchAllCart = createAsyncThunk('cart/fetchAllCart', async (userId) => {
    const res = await httpRequest.get(`cart/get-all?userId=${userId}`);

    if (res && res.DT) {
        const result = res.DT.map((item) => ({
            ...item,
            selected: false,
        }));

        return result;
    }

    return [];
});

export const deleteOneProductFromCart = createAsyncThunk(
    'cart/deleteOneProductFromCart',
    async ({ userId, productId },thunkAPI) => {
        const res = await httpRequest.put(`cart/delete-one`, { userId, productId });
        if (res && res.EC === 0) {
            toast.success('Xóa sản phẩm thành công');
            thunkAPI.dispatch(fetchAllCart(userId))
            return res;
        } else {
            toast.error('Xãy ra lỗi vui lòng thử lại');
            return res ? res.DT : [];
        }
    },
);

export const deleteMultipleProductFormCart = createAsyncThunk(
    'cart/deleteMultipleProductFormCart',
    async (itemsToDelete,thunkAPI) => {
        const res = await httpRequest.put(`cart/delete-multiple`, { itemsToDelete });
        if (res && res.EC === 0) {
            toast.success('Xóa sản phẩm thành công');
            thunkAPI.dispatch(fetchAllCart(itemsToDelete.userId))

            return res;
        } else {
            toast.error('Xãy ra lỗi vui lòng thử lại');
            return res ? res.DT : [];
        }
    },
);

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
    reducers: {
        handleOnChangeQuantity: () => {},
    },
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
            .addCase(fetchAllCart.pending, (state, action) => {
                state.loading = true;
                state.error = false;
                NProgress.start();
            })
            .addCase(fetchAllCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.cartList = action.payload;
                NProgress.done();
            })
            .addCase(fetchAllCart.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            //
            .addCase(changeQuantity.pending, (state, action) => {
                // state.loading = true;
                state.error = false;
            })
            .addCase(changeQuantity.fulfilled, (state, action) => {
                // state.loading = false;
                state.error = false;
            })
            .addCase(changeQuantity.rejected, (state, action) => {
                // state.loading = true;
                state.error = false;
            })
            // delete one product form cart
            .addCase(deleteOneProductFromCart.pending, (state, action) => {
                // state.loading = true;
                state.error = false;
            })
            .addCase(deleteOneProductFromCart.fulfilled, (state, action) => {
                // state.loading = false;
                state.error = false;
            })
            .addCase(deleteOneProductFromCart.rejected, (state, action) => {
                // state.loading = true;
                state.error = false;
            })
            // delete multiple product form cart
            .addCase(deleteMultipleProductFormCart.pending, (state, action) => {
                // state.loading = true;
                state.error = false;
            })
            .addCase(deleteMultipleProductFormCart.fulfilled, (state, action) => {
                // state.loading = false;
                state.error = false;
            })
            .addCase(deleteMultipleProductFormCart.rejected, (state, action) => {
                // state.loading = true;
                state.error = false;
            });
    },
});
export const { handleOnChangeQuantity } = cartSlice.actions;

export default cartSlice.reducer;
