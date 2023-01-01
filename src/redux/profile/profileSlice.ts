import { createSlice } from '@reduxjs/toolkit';
import { getFreelancerProfileAction } from './profileActions';

export interface ProfileState {
    message?: string | null;
    loading: boolean;
    freelancerProfile: any;
}

const initialState: ProfileState = {
    loading: false,
    message: null,
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
    }
});

export default profileSlice.reducer;