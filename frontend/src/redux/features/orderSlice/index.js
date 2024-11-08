import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import httpRequest from '~/utils/httpRequest';
import { deleteMultipleProductFormCartWithId, fetchAllCart } from '../cartSlice';

export const createNewOrderApi = createAsyncThunk('order/createNewOrderApi', async (data, thunkAPI) => {
    const res = await httpRequest.post(`order/create`, data);
    if (res && res.EC === 0) {
        await thunkAPI.dispatch(deleteMultipleProductFormCartWithId({ data: data.cartId, userId: data.userId }));
    } else {
        toast.error('Xảy ra lỗi vui lòng thử lại');
    }

    return res ? res.DT : [];
});

export const getAllOrder = createAsyncThunk(
    'order/getAllOrder',
    async ({ limit, page, pending, pendingShipment, orderStatus }, thunkAPI) => {
        const res = await httpRequest.get(
            `order/get-all-order?limit=${limit}&page=${page}${pending ? '&pending=true' : ''}${
                pendingShipment == null ? '' : pendingShipment ? '&pendingShipment=1' : '&pendingShipment=0'
            }${orderStatus == null ? '' : orderStatus ? '&orderStatus=1' : '&orderStatus=0'}`,
        );

        return res ? res.DT : [];
    },
);

export const getAllOrderWithUserIdApi = createAsyncThunk(
    'order/getAllOrderWithUserIdApi',
    async ({ limit, page, userId, pending, statusReturnProduct }, thunkAPI) => {
        const res = await httpRequest.get(
            `order/get-all-order-with-user-id?limit=${limit}&page=${page}&userId=${userId}${
                pending ? `&pending=${pending}` : ''
            }${statusReturnProduct ? `&statusReturnProduct=${statusReturnProduct}` : ''}`,
        );

        return res ? res.DT : [];
    },
);

export const getAllOrderDeliveryWithUserIdApi = createAsyncThunk(
    'order/getAllOrderDeliveryWithUserIdApi',
    async ({ limit, page, userId }, thunkAPI) => {
        const res = await httpRequest.get(
            `order/get-all-order-in-transit-with-user-id?limit=${limit}&page=${page}&userId=${userId}`,
        );

        return res ? res.DT : [];
    },
);

export const getAllStatusOrderWithUserIdApi = createAsyncThunk(
    'order/getAllStatusOrderWithUserIdApi',
    async ({ limit, page, userId, status, statusReturnProduct }, thunkAPI) => {
        const res = await httpRequest.get(
            `order/get-all-status-order-with-user-id?limit=${limit}&page=${page}&userId=${userId}&status=${
                status ? 1 : 0
            }`,
        );

        return res ? res.DT : [];
    },
);

export const getOneOrderApi = createAsyncThunk('order/getOneOrderApi', async (orderId, thunkAPI) => {
    const res = await httpRequest.get(`order/get-one-order/${orderId}`);

    return res ? res.DT : {};
});

export const cancelOrderApi = createAsyncThunk(
    'order/cancelOrderApi',
    async ({ orderId, userId, productList }, thunkAPI) => {
        const res = await httpRequest.put(`order/delete-order?orderId=${orderId}`, productList);
        await thunkAPI.getAllOrderWithUserIdApi(userId);
        return res ? res.DT : {};
    },
);

export const cancelOrderApiAdmin = createAsyncThunk(
    'order/cancelOrderApiAdmin',
    async ({ orderId, userId, productList }, thunkAPI) => {
        const res = await httpRequest.put(`order/delete-order?orderId=${orderId}`, productList);
        await thunkAPI.getAllOrder({ limit: 3, page: 1 });
        return res ? res.DT : {};
    },
);

export const confirmOrderAdmin = createAsyncThunk('order/confirmOrderAdmin', async ({ orderId, page }, thunkAPI) => {
    const res = await httpRequest.post(`order/confirm-order`, { orderId: orderId });

    await thunkAPI.getAllOrder({ limit: 3, page: page });

    return res ? res.DT : {};
});

export const confirmOrderForShipmentAdmin = createAsyncThunk(
    'order/confirmOrderForShipmentAdmin',
    async ({ orderId, page }, thunkAPI) => {
        const res = await httpRequest.post(`order/confirm-order-for-shipment`, { orderId: orderId });

        // await thunkAPI.getAllOrder({ limit: 3, page: page });

        return res ? res.DT : {};
    },
);

export const totalProductsSold = createAsyncThunk('order/totalProductsSold', async () => {
    const res = await httpRequest.get(`order/total-products-sold`);

    return res ? res.DT : {};
});

export const totalRevenueApi = createAsyncThunk('order/totalRevenueApi', async () => {
    const res = await httpRequest.get(`order/total-revenue`);

    return res ? res.DT : {};
});

export const customerConfirmOrderApi = createAsyncThunk(
    'order/customerConfirmOrderApi',
    async ({ orderId, userId }) => {
        const res = await httpRequest.post(`order/customer-confirm-order`, { orderId: orderId });

        return res ? res.DT : {};
    },
);

export const customerReturnOrderApi = createAsyncThunk(
    'order/customerReturnOrderApi',
    async ({ orderId, userId, productId, productQuantity }) => {
        const res = await httpRequest.post(`order/customer-return-order`, {
            orderId: orderId,
            productId: productId,
            productQuantity: productQuantity,
        });
        if (res && res.EC === 0) {
            toast.success('Đã trả sản phẩm này');
        } else {
            toast.error('Xảy ra lỗi vui lòng thử lại');
        }
        return res ? res.DT : {};
    },
);

export const totalOrderSoldApi = createAsyncThunk('order/totalOrderSoldApi', async () => {
    const res = await httpRequest.get(`order/total-order-sold`);

    return res ? res.DT : {};
});

export const totalOrderReturnApi = createAsyncThunk('order/totalOrderReturnApi', async () => {
    const res = await httpRequest.get(`order/total-order-return`);

    return res ? res.DT : {};
});

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        loading: false,
        error: false,
        totalPrice: null,
        totalOrderSold: null,
        totalOrderReturn: null,
        totalRevenue: null,
        totalProductSold: null,
        orderId: null,
        paymentMethod: null,
        orderList: [],
        orderListAdmin: [],
        productOrderedList: [],
        orderItem: {},
        actionFetchApi: { type: 'get-all' },
    },
    reducers: {
        handleChoseActionToFetchApiOrder: (state, action) => {
            state.actionFetchApi = action.payload;
        },
    },
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
            /// get-all-order-with-user-id
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
            /// get-all-order
            .addCase(getAllOrder.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getAllOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.orderListAdmin = action.payload;
            })
            .addCase(getAllOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            /// get-all-order-delivery
            .addCase(getAllOrderDeliveryWithUserIdApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getAllOrderDeliveryWithUserIdApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.orderList = action.payload;
            })
            .addCase(getAllOrderDeliveryWithUserIdApi.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            /// get-all-order
            .addCase(getAllStatusOrderWithUserIdApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getAllStatusOrderWithUserIdApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.orderList = action.payload;
            })
            .addCase(getAllStatusOrderWithUserIdApi.rejected, (state, action) => {
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
            // cancel order
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
            })
            // cancel order
            .addCase(cancelOrderApiAdmin.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(cancelOrderApiAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
            })
            .addCase(cancelOrderApiAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            // confirm order
            .addCase(confirmOrderAdmin.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(confirmOrderAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
            })
            .addCase(confirmOrderAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            // confirm order for shipment
            .addCase(confirmOrderForShipmentAdmin.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(confirmOrderForShipmentAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
            })
            .addCase(confirmOrderForShipmentAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })

            .addCase(totalProductsSold.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(totalProductsSold.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.totalProductSold = action.payload;
            })
            .addCase(totalProductsSold.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })

            .addCase(totalRevenueApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(totalRevenueApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.totalRevenue = action.payload;
            })
            .addCase(totalRevenueApi.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })

            .addCase(customerConfirmOrderApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(customerConfirmOrderApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
            })
            .addCase(customerConfirmOrderApi.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })

            .addCase(customerReturnOrderApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(customerReturnOrderApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
            })
            .addCase(customerReturnOrderApi.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })

            .addCase(totalOrderSoldApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(totalOrderSoldApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.totalOrderSold = action.payload;
            })
            .addCase(totalOrderSoldApi.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })

            .addCase(totalOrderReturnApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(totalOrderReturnApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.totalOrderReturn = action.payload;
            })
            .addCase(totalOrderReturnApi.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export const { handleOrderProduct, handleChoseActionToFetchApiOrder } = orderSlice.actions;

export default orderSlice.reducer;
