import { createSlice } from '@reduxjs/toolkit';
import { getFreelancerApplicationAction, getRecommendedFreelancersAction, submitFreelancerApplicationAction } from './freelancerActions';

export interface FreelancerState {
    message?: string | null;
    loading: boolean;
    freelancerProfileData: any;
    recentlyJoinedFreelancer: any;
    recentlyJoinedPhotosCache: any;
}

const initialState: FreelancerState = {
    loading: false,
    message: null,
    freelancerProfileData: null,
    recentlyJoinedFreelancer: null,
    recentlyJoinedPhotosCache: {}
}

export const freelancerSlice = createSlice({
    name: 'freelancer',
    initialState,
    reducers: {
        addRecentlyJoinedPhotoToCache: (state, action) => {
            state.recentlyJoinedPhotosCache[action.payload.name] = action.payload.data;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFreelancerApplicationAction.pending, (state: FreelancerState) => {
            state.freelancerProfileData = {};
            state.loading = true;
            state.message = null;
        });
        builder.addCase(getFreelancerApplicationAction.fulfilled, (state: FreelancerState, action) => {
            state.freelancerProfileData = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
        });
        builder.addCase(getFreelancerApplicationAction.rejected, (state: FreelancerState) => {
            state.loading = false;
            state.message = null;
        });

        builder.addCase(submitFreelancerApplicationAction.pending, (state: FreelancerState) => {
            state.freelancerProfileData = {};
            state.loading = true;
            state.message = null;
        });
        builder.addCase(submitFreelancerApplicationAction.fulfilled, (state: FreelancerState, action) => {
            state.freelancerProfileData = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
        });
        builder.addCase(submitFreelancerApplicationAction.rejected, (state: FreelancerState) => {
            state.loading = false;
            state.message = null;
        });

        builder.addCase(getRecommendedFreelancersAction.pending, (state: FreelancerState, action) => {
            state.recentlyJoinedFreelancer = {};
        });
        builder.addCase(getRecommendedFreelancersAction.fulfilled, (state: FreelancerState, action) => {
            state.recentlyJoinedFreelancer = action.payload.data;
        });
        builder.addCase(getRecommendedFreelancersAction.rejected, (state: FreelancerState, action) => {
            state.recentlyJoinedFreelancer = { records: [] };
        });
    }
});

const { addRecentlyJoinedPhotoToCache } = freelancerSlice.actions;
export { addRecentlyJoinedPhotoToCache }

export default freelancerSlice.reducer;