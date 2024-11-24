import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import httpRequest from '~/utils/httpRequest';
import { deleteMultipleProductFormCartWithId, fetchAllCart } from '../cartSlice';

export const getAllVoucher = createAsyncThunk('voucher/getAllVoucher', async ({ page, limit }, thunkAPI) => {
    const res = await httpRequest.get(`voucher/get-all?page=${page}&limit=${limit}`);

    return res ? res.DT : [];
});

export const voucherSlice = createSlice({
    name: 'voucher',
    initialState: {
        loading: false,
        error: false,
        appliedVoucher: null,
        voucherList: [],
    },
    reducers: {
        handleSelectedVoucher: (state, action) => {
            state.appliedVoucher = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllVoucher.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getAllVoucher.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.voucherList = action.payload;
            })
            .addCase(getAllVoucher.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export const { handleSelectedVoucher } = voucherSlice.actions;

export default voucherSlice.reducer;
