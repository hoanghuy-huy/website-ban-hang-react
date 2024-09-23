import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import httpRequest from '~/utils/httpRequest';
import { deleteMultipleProductFormCartWithId } from '../cartSlice';

export const createNewOrderApi = createAsyncThunk('order/createNewOrderApi', async (data, thunkAPI) => {
    const res = await httpRequest.post(`order/create`, data);
    if (res && res.EC === 0) {
        window.location.href = '/payment/success';
        thunkAPI.dispatch(deleteMultipleProductFormCartWithId({ data: data.cartId, userId: data.userId }));
    } else {
        toast.error('Xảy ra lỗi vui lòng thử lại');
    }

    return res ? res.DT : [];
});

export const getAllOrderWithUserIdApi = createAsyncThunk(
    'order/getAllOrderWithUserIdApi',
    async ({ limit, page, userId }, thunkAPI) => {
        const res = await httpRequest.get(
            `order/get-all-order-with-user-id?limit=${limit}&page=${page}&userId=${userId}`,
        );

        return res ? res.DT : [];
    },
);

export const getOneOrderApi = createAsyncThunk('order/getOneOrderApi', async (orderId, thunkAPI) => {
    const res = await httpRequest.get(`order/get-one-order/${orderId}`);

    return res ? res.DT : {};
});

export const cancelOrderApi = createAsyncThunk('order/cancelOrderApi', async ({ orderId, userId }, thunkAPI) => {
    const res = await httpRequest.put(`order/delete-order?orderId=${orderId}`);
    thunkAPI.getAllOrderWithUserIdApi(userId);
    return res ? res.DT : {};
});

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        loading: false,
        error: false,
        totalPrice: null,
        orderId: null,
        paymentMethod: null,
        orderList: [],
        productOrderedList: [],
        orderItem: {},
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
                state.totalPrice = action.payload.totalPrice;
                state.orderId = action.payload.id;
            })
            .addCase(createNewOrderApi.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            ///
            .addCase(getAllOrderWithUserIdApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getAllOrderWithUserIdApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.orderList = action.payload;
            })
            .addCase(getAllOrderWithUserIdApi.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            //
            .addCase(getOneOrderApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getOneOrderApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.orderItem = action.payload;
            })
            .addCase(getOneOrderApi.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            //
            .addCase(cancelOrderApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(cancelOrderApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
            })
            .addCase(cancelOrderApi.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export const { handleOrderProduct } = orderSlice.actions;

export default orderSlice.reducer;
