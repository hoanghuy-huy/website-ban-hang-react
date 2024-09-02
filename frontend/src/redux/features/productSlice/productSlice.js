import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import httpRequest from '~/utils/httpRequest';
import NProgress from 'nprogress';

export const fetchOneCategory = createAsyncThunk('products/fetchOneCategory', async (pathCategory) => {
    const res = await httpRequest.get(`categories/get-one/${pathCategory}`);

    return res ? res.DT : [];
});

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

export const fetchAllProductPagination = createAsyncThunk(
    'products/fetchAllProductPagination',
    async ({ limit, page }) => {
        const res = await httpRequest.get(`products/get-all-pagination?limit=${limit}&page=${page}`);

        return res ? res.DT : [];
    },
);

export const fetchAllProductHotPagination = createAsyncThunk(
    'products/fetchAllProductHotPagination',
    async ({ limit, page }) => {
        const res = await httpRequest.get(`products/get-all-hot-pagination?limit=${limit}&page=${page}`);

        return res ? res.DT : [];
    },
);

export const fetchAllProductDiscountPagination = createAsyncThunk(
    'products/fetchAllProductDiscountPagination',
    async ({ limit, page }) => {
        const res = await httpRequest.get(`products/get-all-discount-pagination?limit=${limit}&page=${page}`);

        return res ? res.DT : [];
    },
);

export const fetchAllProductAuthenticPagination = createAsyncThunk(
    'products/fetchAllProductAuthenticPagination',
    async ({ limit, page }) => {
        const res = await httpRequest.get(`products/get-all-authentic-pagination?limit=${limit}&page=${page}`);

        return res ? res.DT : [];
    },
);


export const fetchProductPaginationWithCategoryId = createAsyncThunk(
    'products/fetchProductPaginationWithCategoryId',
    async ({ categoryId, limit, page }) => {
        const res = await httpRequest.get(
            `products/get-product-with-category-id/${categoryId}?limit=${limit}&page=${page}`,
        );

        return res ? res.DT : [];
    },
);

const initialState = {
    category: [],
    product: [],
    categoryProduct: [],
    listProductHot: [],
    productDetail: [],
    listProductPagination: [],
    listProductPaginationWithCategory: [],
    actionFetchProductHome: { type: 'fetch all product' },
    error: false,
    loading: false,
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        handleReassignDataProductHome: (state, action) => {
            if (action.payload.type === 'dataAllProductHot') {
                state.actionFetchProductHome = { type: 'fetch all product hot' };
            } else if (action.payload.type === 'dataAllProductAuthentic') {
                state.actionFetchProductHome = { type: 'fetch all product authentic' };
            } else if (action.payload.type === 'dataAllProductDiscount') {
                state.actionFetchProductHome = { type: 'fetch all product discount' };
            } else {
                state.actionFetchProductHome = { type: 'fetch all product' };
            }
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchOneCategory.pending, (state, action) => {
                state.loading = true;
                state.error = false;
                NProgress.start();
            })
            .addCase(fetchOneCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.category = action.payload;
                NProgress.done();
            })
            .addCase(fetchOneCategory.rejected, (state, action) => {
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
            })
            //get all product hot pagination
            .addCase(fetchAllProductHotPagination.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchAllProductHotPagination.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.listProductPagination = action.payload;
            })
            .addCase(fetchAllProductHotPagination.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            //get all product hot pagination
            .addCase(fetchAllProductAuthenticPagination.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchAllProductAuthenticPagination.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.listProductPagination = action.payload;
            })
            .addCase(fetchAllProductAuthenticPagination.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            //get all product hot pagination
            .addCase(fetchAllProductDiscountPagination.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchAllProductDiscountPagination.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.listProductPagination = action.payload;
            })
            .addCase(fetchAllProductDiscountPagination.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            //get product pagination with category id
            .addCase(fetchProductPaginationWithCategoryId.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchProductPaginationWithCategoryId.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.listProductPaginationWithCategory = action.payload;
            })
            .addCase(fetchProductPaginationWithCategoryId.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});
export const { handleReassignDataProductHome } = productSlice.actions;

export default productSlice.reducer;
