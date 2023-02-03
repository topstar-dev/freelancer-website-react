import { createSlice } from '@reduxjs/toolkit';
import { FUNCTION_TYPES } from '../constants';
import { getClientProfileAction, getFreelancerProfileAction, profileImageDownload } from './profileActions';

export interface ProfileState {
    message?: string | null;
    loading: boolean;
    loadingClientProfile: boolean;
    clientProfile: any;
    freelancerProfile: any;
    userAvatar: any;
    loadingAvatar: any;
    userProfile: any;
    loadingProfile: any;
}

const initialState: ProfileState = {
    loading: false,
    loadingClientProfile: false,
    message: null,
    clientProfile: null,
    freelancerProfile: null,
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
        builder.addCase(getFreelancerProfileAction.pending, (state: ProfileState) => {
            state.freelancerProfile = null;
            state.loading = true;
        });
        builder.addCase(getFreelancerProfileAction.fulfilled, (state: ProfileState, action) => {
            state.freelancerProfile = action.payload.data;
            state.loading = false;
        });
        builder.addCase(getFreelancerProfileAction.rejected, (state: ProfileState) => {
            state.loading = false
        });

        builder.addCase(getClientProfileAction.pending, (state: ProfileState) => {
            state.clientProfile = null;
            state.loadingClientProfile = true;
        });
        builder.addCase(getClientProfileAction.fulfilled, (state: ProfileState, action) => {
            state.clientProfile = action.payload.data;
            state.loadingClientProfile = false;
        });
        builder.addCase(getClientProfileAction.rejected, (state: ProfileState) => {
            state.loadingClientProfile = false
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