import { createSlice } from '@reduxjs/toolkit';
import { imageDownload } from './otherActions';

export interface OtherState {
    message?: string | null;
    loading: boolean;
    userPic: any;
}

const initialState: OtherState = {
    loading: false,
    message: null,
    userPic: null
}

export const otherSlice = createSlice({
    name: 'other',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(imageDownload.pending, (state: OtherState) => {
            state.userPic = null;
            state.loading = true;
        });
        builder.addCase(imageDownload.fulfilled, (state: OtherState, action) => {
            state.userPic = action.payload.file;
            state.loading = false;
        });
        builder.addCase(imageDownload.rejected, () => {
        });
    }
});

export default otherSlice.reducer;