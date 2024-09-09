import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
    async ({ categoryId, limit, page, sort, starNumber, minPrice, maxPrice, brand }) => {
        const res = await httpRequest.get(
            `products/get-product-with-category-id/${categoryId}?limit=${limit}&page=${page}&sort=${
                sort ? sort : ''
            }&starNumber=${starNumber ? 1 : 0}&price=${[
                minPrice ? minPrice : 0,
                maxPrice ? maxPrice : 0,
            ]}&brand=${brand ? brand : []}`,
        );

        return res ? res.DT : [];
    },
);

export const fetchAllProductHotPaginationWithCategoryId = createAsyncThunk(
    'products/fetchAllProductHotPaginationWithCategoryId',
    async ({ categoryId, limit, page, sort, starNumber, minPrice, maxPrice, brand }) => {
        const res = await httpRequest.get(
            `categories/get-all-product-hot-pagination?page=${page}&limit=${limit}&categoryId=${categoryId}&sort=${
                sort ? sort : ''
            }&starNumber=${starNumber ? 1 : 0}&price=${[
                minPrice ? minPrice : 0,
                maxPrice ? maxPrice : 0,
            ]}&brand=${brand ? brand : []}`,
        );

        return res ? res.DT : [];
    },
);

export const fetchAllProductBestSellerPaginationWithCategoryId = createAsyncThunk(
    'products/fetchAllProductBestSellerPaginationWithCategoryId',
    async ({ categoryId, limit, page, sort, starNumber, minPrice, maxPrice, brand }) => {
        const res = await httpRequest.get(
            `categories/get-all-product-best-seller-pagination?page=${page}&limit=${limit}&categoryId=${categoryId}&sort=${
                sort ? sort : ''
            }&starNumber=${starNumber ? 1 : 0}&price=${[
                minPrice ? minPrice : 0,
                maxPrice ? maxPrice : 0,
            ]}&brand=${brand ? brand : []}`,
        );

        return res ? res.DT : [];
    },
);

const initialState = {
    category: [],
    product: [],
    categoryId: null,
    categoryProduct: [],
    listProductHot: [],
    productDetail: [],
    listProductPagination: [],
    listProductPaginationWithCategory: [],
    actionFetchProductHome: { type: 'fetch all product' },
    actionFetchProductCategory: { type: 'fetch all product' },
    sortValue: '',
    minPriceRedux: '',
    maxPriceRedux: '',
    brandValueToFilter: [],
    starNumberCheckBoxValue: false,
    descendingPrice: 'Giá : Cao đến Thấp',
    ascendingPrice: 'Giá : Thấp đến Cao',
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
        handleReassignDataProductCategory: (state, action) => {
            if (action.payload.type === 'dataAllProductHot') {
                state.actionFetchProductCategory = { type: 'fetch all product hot' };
            } else if (action.payload.type === 'dataAllProductBestSeller') {
                state.actionFetchProductCategory = { type: 'fetch all product best seller' };
            } else {
                state.actionFetchProductCategory = { type: 'fetch all product' };
            }
        },
        handleChangeValueSort: (state, action) => {
            if (state.descendingPrice === action.payload) {
                state.sortValue = 'DESC';
            } else if (state.ascendingPrice === action.payload) {
                state.sortValue = 'ASC';
            } else {
                state.sortValue = '';
            }
        },
        handleChangeStarNumberCheckBoxValue: (state, action) => {
            state.starNumberCheckBoxValue = action.payload;
        },
        handleFetchDataWithFilterPrice: (state, action) => {
            if(!action.payload) {
                state.maxPriceRedux = ''
                state.minPriceRedux = ''
                return
            };
            state.maxPriceRedux = +action.payload.maxPrice;
            state.minPriceRedux = +action.payload.minPrice ? +action.payload.minPrice : '';
        },
        handleChangeBrandValueToFilter: (state, action) => {
            state.brandValueToFilter = action.payload 
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
            })
            //get product hot pagination with category id
            .addCase(fetchAllProductHotPaginationWithCategoryId.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchAllProductHotPaginationWithCategoryId.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.listProductPaginationWithCategory = action.payload;
            })
            .addCase(fetchAllProductHotPaginationWithCategoryId.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            //get product hot pagination with category id
            .addCase(fetchAllProductBestSellerPaginationWithCategoryId.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchAllProductBestSellerPaginationWithCategoryId.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.listProductPaginationWithCategory = action.payload;
            })
            .addCase(fetchAllProductBestSellerPaginationWithCategoryId.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});
export const {
    handleReassignDataProductHome,
    handleReassignDataProductCategory,
    handleChangeValueSort,
    handleChangeStarNumberCheckBoxValue,
    handleFetchDataWithFilterPrice,
    handleChangeBrandValueToFilter,
} = productSlice.actions;

export default productSlice.reducer;
