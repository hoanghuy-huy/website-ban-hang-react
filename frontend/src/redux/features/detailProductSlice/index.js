import { createAsyncThunk, createSlice, createAction, current } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    listProductToCompare: [],
    showFormCompare: false,
    error: false,
    loading: false,
    showFormShrinkCompare: false,
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
            state.showFormCompare = true;
            state.listProductToCompare.push(action.payload);
            console.log(current(state.listProductToCompare));
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
            state.listProductToCompare.push(action.payload);
        },
        handleShrinkFormCompare: (state, action) => {
            state.showFormCompare = false;
            state.showFormShrinkCompare = true;
        },
        handleDeleteAllItemCompare: (state, action) => {
            state.listProductToCompare = [];
        },
    },
});

export const {
    handleShowFromCompare,
    handleDeleteItemCompare,
    handleAddItemCompare,
    handleShrinkFormCompare,
    handleDeleteAllItemCompare,
} = detailProductSlice.actions;

export default detailProductSlice.reducer;
