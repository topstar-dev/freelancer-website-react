import { createSlice } from '@reduxjs/toolkit';
import { imageDownload } from './otherActions';

export interface OtherState {
    message?: string | null;
    loading: boolean;
    userAvatar: any;
    userProfile: any
}

const initialState: OtherState = {
    loading: false,
    message: null,
    userAvatar: null,
    userProfile: null
}

export const otherSlice = createSlice({
    name: 'other',
    initialState,
    reducers: {
        clearAvatar: (state) => {
            state.userAvatar = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(imageDownload.pending, (state: OtherState) => {
            state.userAvatar = null;
            state.loading = true;
        });
        builder.addCase(imageDownload.fulfilled, (state: OtherState, action) => {
            state.userAvatar = URL.createObjectURL(action.payload.file);
            state.loading = false;
        });
        builder.addCase(imageDownload.rejected, () => {
        });
    }
});

const { clearAvatar } = otherSlice.actions;
export { clearAvatar }
export default otherSlice.reducer;