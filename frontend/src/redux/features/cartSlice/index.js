import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import httpRequest from '~/utils/httpRequest';
import NProgress from 'nprogress';
import { useDispatch } from 'react-redux';
import { current } from '@reduxjs/toolkit';

export const fetchAllCart = createAsyncThunk('cart/fetchAllCart', async (userId) => {
    const res = await httpRequest.get(`cart/get-all?userId=${userId}`);

    return res ? res.DT : [];
});

export const addProductToCart = createAsyncThunk(
    'cart/addProductToCart',
    async ({ productId, userId, quantity }, thunkAPI) => {
        const res = await httpRequest.post('cart/add-product-to-cart', { productId, userId, quantity });
        if (res && res.EC === 0) {
            toast.success('Thêm vào giỏ hàng thành công');

            thunkAPI.dispatch(fetchAllCart(userId));
            return res ? res.DT : [];
        } else {
            toast.error('Xảy ra lỗi vui lòng thử lại');
            return;
        }
    },
);

export const removeOneProductFromCart = createAsyncThunk(
    'cart/removeOneProductFromCart',
    async ({ cartId, userId }, thunkAPI) => {
        const res = await httpRequest.put(`cart/delete-one`, { cartId });
        if (res && res.EC === 0) {
            toast.success('Xóa sản phẩm thành công');

            thunkAPI.dispatch(fetchAllCart(userId));
            return res;
        } else {
            toast.error('Xãy ra lỗi vui lòng thử lại');
            return res ? res.DT : [];
        }
    },
);

export const deleteMultipleProductFormCart = createAsyncThunk(
    'cart/deleteMultipleProductFormCart',
    async ({ itemsToDelete, userId }, thunkAPI) => {
        const res = await httpRequest.put(`cart/delete-multiple`, { itemsToDelete });
        if (res && res.EC === 0) {
            toast.success('Xóa sản phẩm thành công');

            thunkAPI.dispatch(fetchAllCart(userId));

            return res;
        } else {
            toast.error('Xãy ra lỗi vui lòng thử lại');
            return res ? res.DT : [];
        }
    },
);

export const changeQuantity = createAsyncThunk('cart/changeQuantity', async ({ userId, productId, quantity }) => {
    const res = await httpRequest.post(`cart/change-quantity`, { userId, productId, quantity });

    return res ? res.DT : [];
});

export const selectedProduct = createAsyncThunk('cart/selectedProduct', async ({ cartId, userId }, thunkAPI) => {
    const res = await httpRequest.post(`cart/selected`, { cartId });

    return res ? res.DT : [];
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        loading: false,
        error: false,
        showModalDelete: false,
        cartList: [],
        itemsToRemove: [],
        itemsToOrder: [],
        address: [],
        showModalAddress: false,
    },
    reducers: {
        handleOnClickChangeQuantity: (state, action) => {
            switch (action.payload.type) {
                case 'plus':
                    const updatedQuantityPlus = current(state.cartList).map((item) => {
                        if (item.id === action.payload.id) {
                            return { ...item, quantity: item.quantity + 1 };
                        }
                        return item;
                    });

                    state.cartList = updatedQuantityPlus;
                    break;
                case 'minus':
                    const updatedQuantityMinus = current(state.cartList).map((item) => {
                        if (item.id === action.payload.id) {
                            if (item.quantity === 1) {
                                state.showModalDelete = true;
                                state.itemsToRemove = action.payload.id;
                                return item;
                            }
                            return { ...item, quantity: item.quantity - 1 };
                        }
                        return item;
                    });

                    state.cartList = updatedQuantityMinus;
                    break;
                default:
                    break;
            }
        },
        handleOnChangeSelected: (state, action) => {
            const updateStatusSelected = current(state.cartList).map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, selected: !item.selected };
                }
                return item;
            });
            state.cartList = updateStatusSelected;

            const checkAll = state.cartList.every((item) => item.selected === true);
            document.getElementById('checkAll').checked = checkAll;
        },
        handleOnChangeSelectedAll: (state, action) => {
            const updateStatusSelected = current(state.cartList).map((item) => {
                return { ...item, selected: action.payload };
            });

            state.cartList = updateStatusSelected;
        },
        handleCloseModalDelete: (state, action) => {
            state.itemsToRemove = null;
            state.showModalDelete = false;
        },
        handleShowModalDelete: (state, action) => {
            if (action.payload.length === 0) {
                toast.error('Vui lòng chọn sản phầm cần xóa');
                return;
            } else {
                state.itemsToRemove = action.payload;
                state.showModalDelete = true;
            }
        },
        handlePurchaseProduct: (state, action) => {
            state.itemsToOrder = action.payload;
            
            return
            
            window.location.href = '/payment';
        },
        handleShowModalAddress: (state) => {
            state.showModalAddress = true;
        },
        handleHideModalAddress: (state) => {
            state.showModalAddress = false;
            return
        },
    },
    extraReducers: (builder) => {
        builder
            // add product to cart
            .addCase(addProductToCart.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            // get all product cart
            .addCase(fetchAllCart.pending, (state, action) => {
                state.loading = true;
                state.error = false;

                NProgress.start();
            })
            .addCase(fetchAllCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.cartList = action.payload;
                NProgress.done();
            })
            .addCase(fetchAllCart.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            //
            .addCase(changeQuantity.pending, (state, action) => {
                // state.loading = true;
                state.error = false;
            })
            .addCase(changeQuantity.fulfilled, (state, action) => {
                // state.loading = false;
                state.error = false;
            })
            .addCase(changeQuantity.rejected, (state, action) => {
                // state.loading = true;
                state.error = false;
            })
            // delete one product form cart
            .addCase(removeOneProductFromCart.pending, (state, action) => {
                // state.loading = true;
                state.error = false;
            })
            .addCase(removeOneProductFromCart.fulfilled, (state, action) => {
                // state.loading = false;
                state.showModalDelete = false;
                state.error = false;
            })
            .addCase(removeOneProductFromCart.rejected, (state, action) => {
                // state.loading = true;
                state.error = false;
            })
            // delete multiple product form cart
            .addCase(deleteMultipleProductFormCart.pending, (state, action) => {
                // state.loading = true;

                state.error = false;
            })
            .addCase(deleteMultipleProductFormCart.fulfilled, (state, action) => {
                // state.loading = false;
                state.showModalDelete = false;

                state.error = false;
            })
            .addCase(deleteMultipleProductFormCart.rejected, (state, action) => {
                // state.loading = true;
                state.error = false;
            })
            // selected product form cart
            .addCase(selectedProduct.pending, (state, action) => {
                // state.loading = true;
                state.error = false;
            })
            .addCase(selectedProduct.fulfilled, (state, action) => {
                // state.loading = false;
                state.error = false;
            })
            .addCase(selectedProduct.rejected, (state, action) => {
                // state.loading = true;
                state.error = false;
            });
    },
});
export const {
    handleOnClickChangeQuantity,
    handleOnChangeSelected,
    handleOnChangeSelectedAll,
    handleShowModalDelete,
    handleCloseModalDelete,
    handlePurchaseProduct,
    handleHideModalAddress,
    handleShowModalAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
