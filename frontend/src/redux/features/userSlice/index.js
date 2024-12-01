import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import httpRequest from '~/utils/httpRequest';

export const totalUserApi = createAsyncThunk('address/totalUserApi', async () => {
    const res = await httpRequest.get(`users/count`);

    return res ? res.DT : [];
});

export const getOneUserApi = createAsyncThunk('user/getOneUserApi', async (id) => {
    const res = await httpRequest.get(`users/${id}`);

    return res ? res.DT : [];
});

export const sendOTPApi = createAsyncThunk('user/sendOTPApi', async ({ email }) => {
    const res = await httpRequest.post(`send-otp`, { email });

    return res ? res.DT : [];
});

export const verifyOTPApi = createAsyncThunk('user/verifyOTPApi', async ({ email, otp }) => {
    const res = await httpRequest.post(`verify-otp`, { email, otp });

    return res ? res.DT : [];
});
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        error: false,
        totalUser: null,
        infoUser: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(totalUserApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(totalUserApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = true;
                state.totalUser = action.payload;
            })
            .addCase(totalUserApi.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            })

            .addCase(getOneUserApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getOneUserApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = true;
                state.infoUser = action.payload;
            })
            .addCase(getOneUserApi.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            })

            .addCase(sendOTPApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(sendOTPApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(sendOTPApi.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            })

            .addCase(verifyOTPApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(verifyOTPApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(verifyOTPApi.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            });
    },
});
export const {} = userSlice.actions;

export default userSlice.reducer;
