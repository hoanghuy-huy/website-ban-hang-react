import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import httpRequest from '~/utils/httpRequest';

export const fetchOneProduct = createAsyncThunk('products/fetchOneProduct', async (productId) => {
    const res = await httpRequest.get(`products/get-one/${productId}`);

    return res ? res.DT : [];
});

export const fetchProductWithCategory = createAsyncThunk('products/fetchProductWithCategory', async (productId) => {
    const res = await httpRequest.get(`products/categories/${productId}`);

    return res ? res.DT : [];
});


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
    listProductToCompare: [],
    listProductPaginationWithCategory: [],
    product: [],
    categoryProduct: [],
    productDetail: [],
    categoryId: null,
    showFormCompare: false,
    error: false,
    loading: false,
    showFormShrinkCompare: false,
    showModalAddProductToCompare: false,
};

export const detailProductSlice = createSlice({
    name: 'detailProduct',
    initialState,
    reducers: {
        handleShowFromCompare: (state, action) => {
            if (!action.payload) {
                state.showFormCompare = true;
                return;
            }
            const checkExist = current(state.listProductToCompare).some((item) => item.id === action.payload.id);
            if (checkExist) {
                toast.error('Sản phẩm đã có trong danh sách so sánh');
                state.showFormCompare = true;
                return;
            }
            if (state.listProductToCompare.length === 4) {
                toast.error('Vui lòng xóa bớt sản phẩm để tiếp tục so sánh');
                return;
            }
            state.showFormCompare = true;
            state.listProductToCompare.push(action.payload);
        },
        handleDeleteItemCompare: (state, action) => {
            const updateListProductCompare = current(state.listProductToCompare).filter(
                (item) => item.id !== action.payload.id,
            );
            state.listProductToCompare = updateListProductCompare;
        },
        handleAddItemCompare: (state, action) => {
            const checkExist = current(state.listProductToCompare).some((item) => item.id === action.payload.id);
            if (checkExist) {
                toast.error('Sản phẩm đã có trong danh sách so sánh');
                state.showFormCompare = true;
                return;
            }
            if(state.listProductToCompare.length >= 4) {
                toast.error('Danh sách sản phẩm đầy vui lòng xóa bớt')
                return
            }
            state.listProductToCompare.push(action.payload);
        },
        handleShrinkFormCompare: (state, action) => {
            state.showFormCompare = false;
            state.showFormShrinkCompare = true;
        },
        handleDeleteAllItemCompare: (state, action) => {
            state.listProductToCompare = [];
        },
        handleShowModalAddProductToCompare: (state, action) => {
            state.showModalAddProductToCompare = !state.showModalAddProductToCompare;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            //get one product
            .addCase(fetchOneProduct.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchOneProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.product = action.payload;
                state.categoryId = action.payload.product.categoryId
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

export const {
    handleShowFromCompare,
    handleDeleteItemCompare,
    handleAddItemCompare,
    handleShrinkFormCompare,
    handleDeleteAllItemCompare,
    handleShowModalAddProductToCompare,
} = detailProductSlice.actions;

export default detailProductSlice.reducer;
