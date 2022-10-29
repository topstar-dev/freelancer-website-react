import { createSlice } from '@reduxjs/toolkit';
import { imageDownload } from './otherActions';

export interface OtherState {
    message?: string | null;
    loading: boolean;
    userAvatar: any;
}

const initialState: OtherState = {
    loading: false,
    message: null,
    userAvatar: null
}

export const otherSlice = createSlice({
    name: 'other',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(imageDownload.pending, (state: OtherState) => {
            state.userAvatar = null;
            state.loading = true;
        });
        builder.addCase(imageDownload.fulfilled, (state: OtherState, action) => {
            state.userAvatar = action.payload.file;
            state.loading = false;
        });
        builder.addCase(imageDownload.rejected, () => {
        });
    }
});

export default otherSlice.reducer;