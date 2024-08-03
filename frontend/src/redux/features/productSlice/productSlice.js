import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import httpRequest from '~/utils/httpRequest';

export const fetchAllProductWithCategory = createAsyncThunk(
    'products/fetchAllProductWithCategory',
    async (pathCategory) => {
        const res = await httpRequest.get(`products/get-one-category/${pathCategory}`);

        return res ? res.DT : [];
    },
);

export const fetchOneProduct = createAsyncThunk('products/fetchOneProduct', async (productId) => {
    const res = await httpRequest.get(`products/get-one/${productId}`);

    return res ? res.DT : [];
});

export const fetchProductWithCategory = createAsyncThunk('products/fetchProductWithCategory', async (productId) => {
    const res = await httpRequest.get(`products/categories/${productId}`);

    return res ? res.DT : [];
});

export const fetchAllProductHot = createAsyncThunk('products/fetchAllProductHot', async () => {
    const res = await httpRequest.get(`products/get-all-hot`);

    return res ? res.DT : [];
});

export const fetchAllProductPagination = createAsyncThunk('products/fetchAllProductPagination', async ({limit, page}) => {
    const res = await httpRequest.get(`products/get-all-pagination?limit=${limit}&page=${page}`);

    return res ? res.DT : [];
});

const initialState = {
    productList: [],
    product: [],
    categoryProduct: [],
    listProductHot: [],
    productDetail: [],
    listProductPagination: [],
    error: false,
    loading: false,
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            //get all product
            .addCase(fetchAllProductWithCategory.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchAllProductWithCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.productList = action.payload;
            })
            .addCase(fetchAllProductWithCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            //get one product
            .addCase(fetchOneProduct.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchOneProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.product = action.payload;
            })
            .addCase(fetchOneProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            //get one category with product id
            .addCase(fetchProductWithCategory.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchProductWithCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.categoryProduct = action.payload;
            })
            .addCase(fetchProductWithCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            //get all product hot
            .addCase(fetchAllProductHot.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchAllProductHot.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.listProductHot = action.payload;
            })
            .addCase(fetchAllProductHot.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            //get all product pagination
            .addCase(fetchAllProductPagination.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchAllProductPagination.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.listProductPagination = action.payload;
            })
            .addCase(fetchAllProductPagination.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export default productSlice.reducer;
