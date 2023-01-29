import { createSlice } from '@reduxjs/toolkit';
import { getClientProfileAction, getFreelancerProfileAction } from './profileActions';

export interface ProfileState {
    message?: string | null;
    loading: boolean;
    loadingClientProfile: boolean;
    clientProfile: any;
    freelancerProfile: any;
}

const initialState: ProfileState = {
    loading: false,
    loadingClientProfile: false,
    message: null,
    clientProfile: null,
    freelancerProfile: null
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
    }
});

export default profileSlice.reducer;