import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpRequest from '~/utils/httpRequest';

export const getAllBrand = createAsyncThunk('brand/getAllBrand', async (categoryId) => {
    const res = await httpRequest.get(`brand/get-all?categoryId=${categoryId}`);

    return res ? res.DT : [];
});


export const brandSlice = createSlice({
    name: 'brand',
    initialState: {
        loading: false,
        error: false,
        brandList:[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get all brand
            .addCase(getAllBrand.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getAllBrand.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.brandList = action.payload;
            })
            .addCase(getAllBrand.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            });
    },
});
// export const {} = brandSlice.actions;

export default brandSlice.reducer;
