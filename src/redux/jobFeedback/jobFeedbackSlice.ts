import { createSlice } from '@reduxjs/toolkit';
import { getJobFeedbackAction } from './jobFeedbackActions';

export interface JobFeedbackState {
    message?: string | null;
    loading: boolean;
    jobFeedbackData: any;
}

const initialState: JobFeedbackState = {
    loading: false,
    message: null,
    jobFeedbackData: null
}

export const jobFeedbackSlice = createSlice({
    name: 'jobFeedback',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getJobFeedbackAction.pending, (state: JobFeedbackState) => {
            state.jobFeedbackData = null;
            state.loading = true;
        });
        builder.addCase(getJobFeedbackAction.fulfilled, (state: JobFeedbackState, action) => {
            state.jobFeedbackData = action.payload.data;
            state.loading = false;
        });
        builder.addCase(getJobFeedbackAction.rejected, (state: JobFeedbackState) => {
            state.loading = false
        });
    }
});

export default jobFeedbackSlice.reducer;