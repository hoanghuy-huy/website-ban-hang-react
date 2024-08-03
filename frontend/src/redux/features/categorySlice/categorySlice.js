import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import httpRequest from '~/utils/httpRequest';

// First, create the thunk
export const fetchAllCategories = createAsyncThunk('categories/fetchAllCategories', async () => {
    const response = await httpRequest.get('categories');
    return response.DT;
});

export const fetchOneCategory = createAsyncThunk('categories/fetchOneCategory', async (pathCategory) => {
    const response = await httpRequest.get(`categories/get-one/${pathCategory}`);
    return response.DT;
});

const initialState = {
    categoryList: [],
    productOfCategory:[],
    loading: false,
    error: false,
};

// Then, handle actions in your reducers:
 export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            // get all categories
            .addCase(fetchAllCategories.pending, (state, action) => {
                state.loading = true
                state.error = false
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.categoryList = action.payload
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.loading = false
                state.error = true
            })
            // get one category
            .addCase(fetchOneCategory.pending, (state, action) => {
                state.loading = true
                state.error = false
            })
            .addCase(fetchOneCategory.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.productOfCategory = action.payload
            })
            .addCase(fetchOneCategory.rejected, (state, action) => {
                state.loading = false
                state.error = true
            });
    },
});


export default categoriesSlice.reducer