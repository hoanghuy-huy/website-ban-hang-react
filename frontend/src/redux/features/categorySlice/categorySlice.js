import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import httpRequest from '~/utils/httpRequest';
import NProgress from 'nprogress';
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
    categoryId:null,
    loading: false,
    error: false,
};

// Then, handle actions in your reducers:
 export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
      handleSaveCategoryId:(state, action) => {
        state.categoryId = action.payload
      }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            // get all categories
            .addCase(fetchAllCategories.pending, (state, action) => {
                state.loading = true
                state.error = false
                NProgress.start()
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.categoryList = action.payload
                NProgress.done()
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

export const { 
    handleSaveCategoryId
} = categoriesSlice.actions

export default categoriesSlice.reducer