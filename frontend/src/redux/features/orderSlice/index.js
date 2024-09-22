import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import httpRequest from '~/utils/httpRequest';
import { deleteMultipleProductFormCartWithId } from '../cartSlice';

export const createNewOrderApi = createAsyncThunk('order/createNewOrderApi', async (data,thunkAPI) => {
    const res = await httpRequest.post(`order/create`, data);
    if(res && res.EC === 0) {
        window.location.href = '/payment/success'
        thunkAPI.dispatch(deleteMultipleProductFormCartWithId({data : data.cartId, userId: data.userId}));
    }else {
        toast.error('Xảy ra lỗi vui lòng thử lại')
    }

    return res ? res.DT : [];
});


export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        loading: false,
        error: false,
        totalPrice: null,
        orderId: null,
        paymentMethod: null,
        productOrderedList: [],

    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewOrderApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(createNewOrderApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.totalPrice = action.payload.totalPrice
                state.orderId = action.payload.id
            })
            .addCase(createNewOrderApi.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export const { handleOrderProduct } = orderSlice.actions;

export default orderSlice.reducer;
