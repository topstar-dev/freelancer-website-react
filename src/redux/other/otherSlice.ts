import { createSlice } from '@reduxjs/toolkit';
import { imageDownload } from './otherActions';

export interface OtherState {
    message?: string | null,
    loading: boolean;
    image: any;
}

const initialState: OtherState = {
    loading: false,
    message: null,
    image: null
}

export const otherSlice = createSlice({
    name: 'other',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //download image
        builder.addCase(imageDownload.pending, (state: OtherState, _action) => {
            state.loading = true
        })
        builder.addCase(imageDownload.fulfilled, (state: OtherState, action) => {
            state.loading = false;
            state.image = action.payload.data;
            state.message = action.payload.message;
        })
        builder.addCase(imageDownload.rejected, (state: OtherState, action) => {
            const payload = action.payload as OtherState;
            state.loading = false
            state.message = payload.message;
        })
    }
});

export default otherSlice.reducer;