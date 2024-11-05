import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import httpRequest from '~/utils/httpRequest';

export const getAllBrand = createAsyncThunk('brand/getAllBrand', async (categoryId) => {
    const res = await httpRequest.get(`brand/get-all?categoryId=${categoryId}`);

    return res ? res.DT : [];
});

export const getAllBrandAdmin = createAsyncThunk('brand/getAllBrandAdmin', async () => {
    const res = await httpRequest.get(`brand/get-all-brand`);

    return res ? res.DT : [];
});

export const createBrandApi = createAsyncThunk('brand/createBrandApi', async (rawData) => {
    const res = await httpRequest.post(`brand/create`, rawData);
    if (res && res.EC === 0) {
        toast.success('Thêm thương hiệu thành công');
    } else {
        toast.error('Xảy ra lỗi vui long thử lại');
    }
    return res ? res.DT : [];
});

export const getAllBrandPaginationAdmin = createAsyncThunk(
    'brand/getAllBrandPaginationAdmin',
    async ({ limit, page }) => {
        const res = await httpRequest.get(`brand/get-all-brand-pagination?page=${page}&limit=${limit}`);

        return res ? res.DT : [];
    },
);

export const deleteBrandApi = createAsyncThunk('brand/deleteBrandApi', async ({ brandId }, thunkAPI) => {
    const res = await httpRequest.put(`brand/delete`, { brandId });
    if (res && res.EC === 0) {
        toast.success('Xóa thương hiệu thành công');
        thunkAPI.dispatch(getAllBrandPaginationAdmin({ page: 1, limit: 10 }));
    } else {
        toast.error('Xảy ra lỗi vui long thử lại');
    }
    return res ? res.DT : [];
});

export const editBrandApi = createAsyncThunk('brand/editBrandApi', async (rawData, thunkAPI) => {
    const res = await httpRequest.post(`brand/edit`, rawData);
    if (res && res.EC === 0) {
        toast.success('Cập nhật thương hiệu thành công');
        thunkAPI.dispatch(getAllBrandPaginationAdmin({ page: 1, limit: 10 }));
    } else {
        toast.error('Xảy ra lỗi vui long thử lại');
    }
    return res ? res.DT : [];
});


export const brandSlice = createSlice({
    name: 'brand',
    initialState: {
        loading: false,
        error: false,
        brandList: [],
        brandListAdmin: [],
        brandListAdminPagination: [],
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
            })
            .addCase(getAllBrandAdmin.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getAllBrandAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.brandListAdmin = action.payload;
            })
            .addCase(getAllBrandAdmin.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(createBrandApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(createBrandApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
            })
            .addCase(createBrandApi.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getAllBrandPaginationAdmin.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getAllBrandPaginationAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.brandListAdminPagination = action.payload;
            })
            .addCase(getAllBrandPaginationAdmin.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            })

            .addCase(deleteBrandApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deleteBrandApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
            })
            .addCase(deleteBrandApi.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            })

            .addCase(editBrandApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(editBrandApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
            })
            .addCase(editBrandApi.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            })
    },
});
// export const {} = brandSlice.actions;

export default brandSlice.reducer;
