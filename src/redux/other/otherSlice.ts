import { createSlice } from '@reduxjs/toolkit';
import { FUNCTION_TYPES } from '../constants';
import { imageDownload } from './otherActions';

export interface OtherState {
    message?: string | null;
    loading: boolean;
    loadingProfile: boolean;
    userAvatar: any;
    userProfile: any
}

const initialState: OtherState = {
    loading: false,
    loadingProfile: false,
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
        },
        setAvatar: (state, action) => {

            state.userAvatar = action.payload;
        },
        clearProfile: (state) => {
            state.userProfile = null;
        },
        setProfile: (state, action) => {
            state.userProfile = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(imageDownload.pending, (state: OtherState, action) => {
            if (action.meta.arg.functionType === FUNCTION_TYPES.USER_AVATAR) {
                if (!action.meta.arg.skip) {
                    state.userAvatar = null;
                }
                state.loading = true;
            } else if (action.meta.arg.functionType === FUNCTION_TYPES.USER_PROFILE) {
                state.userProfile = null;
                state.loadingProfile = true;
            }
        });
        builder.addCase(imageDownload.fulfilled, (state: OtherState, action) => {
            if (action.payload.functionType === FUNCTION_TYPES.USER_AVATAR) {
                if (!action.meta.arg.skip) {
                    state.userAvatar = URL.createObjectURL(action.payload.file);
                }
                state.loading = false;
            } else if (action.payload.functionType === FUNCTION_TYPES.USER_PROFILE) {
                state.userProfile = URL.createObjectURL(action.payload.file);
                state.loadingProfile = false;
            }
        });
        builder.addCase(imageDownload.rejected, (state: OtherState, action) => {

        });
    }
});

const { clearAvatar, setAvatar, clearProfile, setProfile } = otherSlice.actions;
export { clearAvatar, setAvatar, clearProfile, setProfile }
export default otherSlice.reducer;