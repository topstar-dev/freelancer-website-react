import { createSlice } from '@reduxjs/toolkit';
import { getFreelancerApplicationAction, getRecommendedFreelancersAction, submitFreelancerApplicationAction } from './freelancerActions';

const recentlyJoinedUtil = (responseData: any) => {
    const marqueeWidth = window.innerWidth;
    const totalElements = responseData.records?.length;
    const elementsToBeAppended = Math.ceil(marqueeWidth / 396);

    const root = document.documentElement;
    root.style.setProperty('--total-lements', `${totalElements}`);
    root.style.setProperty('--elements-to-be-appended', `${elementsToBeAppended}`);

    let currentIndex = 0;
    const newElements = [...(responseData?.records || [])]
    if (elementsToBeAppended > 0) {
        for (let index = 0; index < elementsToBeAppended; index++) {
            if (currentIndex >= totalElements) {
                currentIndex = 0;
            }
            const element = newElements[currentIndex];
            if (element) {
                newElements.push(element)
                currentIndex++;
            }
        }
    }

    return { ...responseData, records: newElements }
}

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
        },
        updateRecentlyJoined: (state) => {
            state.recentlyJoinedFreelancer = recentlyJoinedUtil(state.recentlyJoinedFreelancer);
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
            state.recentlyJoinedFreelancer = recentlyJoinedUtil(action.payload.data);
        });
        builder.addCase(getRecommendedFreelancersAction.rejected, (state: FreelancerState, action) => {
            state.recentlyJoinedFreelancer = { records: [] };
        });
    }
});

const { addRecentlyJoinedPhotoToCache, updateRecentlyJoined } = freelancerSlice.actions;
export { addRecentlyJoinedPhotoToCache, updateRecentlyJoined }

export default freelancerSlice.reducer;