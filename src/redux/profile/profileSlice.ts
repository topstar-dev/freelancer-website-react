import { createSlice } from '@reduxjs/toolkit';
import { FUNCTION_TYPES } from '../constants';
import { getProfileAction, profileImageDownload } from './profileActions';

export interface ProfileState {
    message?: string | null;
    loading: boolean;
    profile: any;
    userAvatar: any;
    loadingAvatar: any;
    userProfile: any;
    loadingProfile: any;
}

const initialState: ProfileState = {
    message: null,
    loading: false,
    profile: null,
    userAvatar: null,
    loadingAvatar: false,
    userProfile: null,
    loadingProfile: false
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfileAction.pending, (state: ProfileState) => {
            state.profile = null;
            state.loading = true;
        });
        builder.addCase(getProfileAction.fulfilled, (state: ProfileState, action) => {
            state.profile = action.payload.data;
            state.loading = false;
        });
        builder.addCase(getProfileAction.rejected, (state: ProfileState) => {
            state.loading = false
        });

        builder.addCase(profileImageDownload.pending, (state: ProfileState, action) => {
            if (action.meta.arg.functionType === FUNCTION_TYPES.USER_AVATAR) {
                state.userAvatar = null;
                state.loadingAvatar = true;
            } else if (action.meta.arg.functionType === FUNCTION_TYPES.USER_PROFILE) {
                state.userProfile = null;
                state.loadingProfile = true;
            }
        });
        builder.addCase(profileImageDownload.fulfilled, (state: ProfileState, action) => {
            if (action.payload.functionType === FUNCTION_TYPES.USER_AVATAR) {
                state.userAvatar = URL.createObjectURL(action.payload.file);
                state.loadingAvatar = false;
            } else if (action.payload.functionType === FUNCTION_TYPES.USER_PROFILE) {
                state.userProfile = URL.createObjectURL(action.payload.file);
                state.loadingProfile = false;
            }
        });
    }
});

export default profileSlice.reducer;