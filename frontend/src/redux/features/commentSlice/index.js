import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpRequest from '~/utils/httpRequest';

export const createNewComment = createAsyncThunk('comment/createNewComment', async (data) => {
    const res = await httpRequest.post(`comment/create`, data);

    return res ? res.DT : [];
});

export const getAllComment = createAsyncThunk('comment/getAllComment', async ({ productId, limit, page, starNumber }) => {
    const res = await httpRequest.get(`comment/get-all?productId=${productId}&limit=${limit}&page=${page}${!!starNumber ? `&starNumber=${starNumber}` : ''}`);

    return res ? res.DT : [];
});

export const getAverageRatingApi = createAsyncThunk('comment/getAverageRatingApi', async ({ productId }) => {
    const res = await httpRequest.get(`comment/average-rating?productId=${productId}`);

    return res ? res.DT : [];
});

export const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        loading: false,
        error: false,
        averageRating: null,
        commentList: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewComment.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(createNewComment.fulfilled, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(createNewComment.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            // get all comment
            .addCase(getAllComment.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getAllComment.fulfilled, (state, action) => {
                state.loading = false;
                state.error = true;
                state.commentList = action.payload;
            })
            .addCase(getAllComment.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            })

            .addCase(getAverageRatingApi.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getAverageRatingApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = true;
                state.averageRating = action.payload;
            })
            .addCase(getAverageRatingApi.rejected, (state, action) => {
                state.loading = true;
                state.error = false;
            });
    },
});
export const {} = commentSlice.actions;

export default commentSlice.reducer;
