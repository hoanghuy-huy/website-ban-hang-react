import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import httpRequest from '~/utils/httpRequest';

export const createNewAddressApi = createAsyncThunk('address/createNewAddressApi', async (data) => {
    const res = await httpRequest.post(`address/create`, data);

    // if (res.EC === 0) {
    //     toast.success('Lưu địa chỉ thành công!');
    // } else {
    //     toast.error('Xảy ra lỗi vui lòng thử lại');
    // }

    return res ? res.DT : [];
});

export const editAddressApi = createAsyncThunk('address/editAddressApi', async (data) => {
    const res = await httpRequest.post(`address/edit`, data);

    return res ? res.DT : [];
});

export const deleteAddressApi = createAsyncThunk('address/deleteAddressApi', async (data) => {
    const res = await httpRequest.put(`address/delete`, data);

    return res ? res.DT : [];
});

export const getAllAddressWithUserId = createAsyncThunk('address/getAllAddressWithUserId', async (userId) => {
    const res = await httpRequest.get(`address/get-all?userId=${userId}`);

    return res ? res.DT : [];
});

export const getAddressDefault = createAsyncThunk('address/getAddressDefault', async (userId) => {
    const res = await httpRequest.get(`address/get-address-default?userId=${userId}`);

    return res ? res.DT : {};
});

export const addressSlice = createSlice({
    name: 'address',
    initialState: {
        loading: false,
        error: false,
        listAddress: [],
        addressDefault: {},
        changeAddress: false,
        changeAddress: false,
    },
    reducers: {
        handleChangeAddressDeliveryRedux: (state, action) => {
            state.addressDefault = action.payload;
            state.changeAddress = true;
            window.location.href = '/cart'
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewAddressApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(createNewAddressApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(createNewAddressApi.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            // edit address
            .addCase(editAddressApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(editAddressApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(editAddressApi.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            //get all address with user id
            .addCase(getAllAddressWithUserId.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getAllAddressWithUserId.fulfilled, (state, action) => {
                state.loading = false;
                state.error = true;
                state.listAddress = action.payload;
            })
            .addCase(getAllAddressWithUserId.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            //get address default
            .addCase(getAddressDefault.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getAddressDefault.fulfilled, (state, action) => {
                state.loading = false;
                state.error = true;
                state.addressDefault = action.payload;
            })
            .addCase(getAddressDefault.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            //delete
            .addCase(deleteAddressApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deleteAddressApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(deleteAddressApi.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            });
    },
});
export const { handleChangeAddressDeliveryRedux } = addressSlice.actions;

export default addressSlice.reducer;
